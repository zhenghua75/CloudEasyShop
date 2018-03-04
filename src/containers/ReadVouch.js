import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
  Picker,
  Modal,
  ActivityIndicator,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';

import Immutable from 'immutable';

import icon from '../constants/iconfont.js';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as actions from '../actions';
import {
  Actions
} from 'react-native-router-flux';

import VouchsScrollRow from '../components/VouchsScrollRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
  },
  inputblocktop: {
    flex: 0,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5,
    backgroundColor: '#220A00'
  },
  toptext: {
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 2,
    color: '#ffffff'
  },
  scoll: {
    flex: 1,
  },
  buttonblock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FE8F45',
    padding: 10,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  iconnav: {
    alignSelf: 'center',
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#FE8F45',
    paddingLeft: 20,
    paddingRight: 20
  },
  iconview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  }
});

class ReadVouch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vouchid: this.props.vouchId,
      submitdisable:false
    }
    this.editVouch = this.editVouch.bind(this);
    this.verifyVouch = this.verifyVouch.bind(this);
  }

  editVouch() {
    if (this.state.vouchid == '' || this.state.vouchid == '0') {
      Alert.alert('错误提示', '参数错误，无法编辑，请刷新后重试', [{
        text: '确定'
      }]);
    } else {
      if (this.props.vouchType == '006001') {
        Actions.EditVouch({
          vouchId: this.state.vouchid,
          vouchType: '006'
        });
      } else {
        Actions.EditVouch({
          vouchId: this.state.vouchid,
          vouchType: this.props.vouchType
        });
      }
    }
  }

  verifyVouch() {
    const {
      actions,
      auth,
      vouch
    } = this.props;
    this.setState({submitdisable:true});
    if (this.state.vouchid == '' || this.state.vouchid == '0') {
      Alert.alert('错误提示', '参数错误，无法审核，请刷新后重试', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else {
      let tmpvouchs = vouch.vouchs.data;
      let isfinal = true;
      if (tmpvouchs.length == 0) {
        Alert.alert('空单', '单据无任何明细数据，不能审核', [{
          text: '确定'
        }]);
        this.setState({submitdisable:false});
      } else{
        if (this.props.vouchType == '009' || this.props.vouchType == '003' || this.props.vouchType == '006' || this.props.vouchType == '006001') {
          for (var i in tmpvouchs) {
            if (tmpvouchs[i].Vouchs.Batch == '' || tmpvouchs[i].Vouchs.Batch == null) {
              isfinal = false;
            }
          }
        }
        if (isfinal) {
          let data = {
            action: 'verify',
            data: {}
          };
          if (this.props.vouchType == '006001') {
            data.data['row_' + this.state.vouchid] = {
              Vouch: {
                IsVerify: true,
                VouchType: '006'
              }
            };
            actions.vouch(auth.token.access_token, '006', data,auth.info.api)
              .then(()=>{this.setState({submitdisable:false})});
            this.timer = setTimeout(() => {
              actions.getVouch(auth.token.access_token, {
                VouchType: this.props.vouchType,
                IsVerify: false,
                VouchDate: '',
                SourceId: vouch.vouch.data[0].Vouch.SourceId
              },auth.info.api);
            }, 500);
          } else if (this.props.vouchType == '009001') {
            data.data['row_' + this.state.vouchid] = {
              Vouch: {
                IsVerify: true,
                VouchType: '009'
              }
            };
            actions.vouch(auth.token.access_token, '009', data,auth.info.api)
              .then(()=>{this.setState({submitdisable:false})});
            this.timer = setTimeout(() => {
              let reqdata = {
                draw: 1,
                columns: [{
                  data: 'VouchLink.SourceId',
                  name: '',
                  searchable: true,
                  orderable: true,
                  search: {
                    value: '=' + this.props.sourceId,
                    regex: false
                  }
                }, {
                  data: 'TransVouch.IsVerify',
                  name: '',
                  searchable: true,
                  orderable: true,
                  search: {
                    value: '',
                    regex: false
                  }
                }, {
                  data: 'Vouch.MakeTime',
                  name: '',
                  searchable: true,
                  orderable: true,
                  search: {
                    value: '',
                    regex: false
                  }
                }],
                order: [{
                  column: 1,
                  dir: 'asc'
                }, {
                  column: 2,
                  dir: 'desc'
                }],
                start: 0,
                length: -1,
                search: {
                  value: '',
                  regex: false
                }
              };
              actions.getVouchLink(auth.token.access_token, reqdata,auth.info.api);
            }, 500);
          } else {
            data.data['row_' + this.state.vouchid] = {
              Vouch: {
                IsVerify: true,
                VouchType: this.props.vouchType
              }
            };
            actions.vouch(auth.token.access_token, this.props.vouchType, data,auth.info.api)
              .then(()=>{this.setState({submitdisable:false})});
            this.timer = setTimeout(() => {
              actions.getVouch(auth.token.access_token, {
                VouchType: this.props.vouchType,
                IsVerify: false,
                VouchDate: ''
              },auth.info.api);
            }, 500);
          }
        } else {
          Alert.alert('明细错误', '单据明细中有缺少批次的记录', [{
            text: '确定'
          }]);
          this.setState({submitdisable:false});
        }
      } 
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  componentDidMount() {
    const {
      actions,
      auth
    } = this.props;
    this.timer = setTimeout(() => {
      let vouchtypetmp = this.props.vouchType;
      if (vouchtypetmp == '006001') {
        vouchtypetmp = '006'
      } else if (vouchtypetmp == '009001') {
        vouchtypetmp = '009'
      }
      let datavouchs = {
        draw: 1,
        columns: [{
          data: 'Vouchs.VouchId',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=' + this.state.vouchid,
            regex: false
          }
        }],
        order: [{
          column: 0,
          dir: 'asc'
        }],
        start: 0,
        length: -1,
        search: {
          value: '',
          regex: false
        }
      };
      let data = {
        draw: 1,
        columns: [{
          data: 'DT_RowId',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=' + this.state.vouchid,
            regex: false
          }
        }, {
          data: 'Vouch.VouchType',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=' + vouchtypetmp,
            regex: false
          }
        }],
        order: [{
          column: 0,
          dir: 'asc'
        }],
        start: 0,
        length: 1,
        search: {
          value: '',
          regex: false
        }
      };
      actions.vouchAndVouchs(auth.token.access_token, vouchtypetmp, data, datavouchs,auth.info.api);
    },100);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   isupdate = false;
  //   var map1 = Immutable.fromJS(nextProps.vouch);
  //   var map2 = Immutable.fromJS(this.props.vouch);
  //   if (Immutable.is(map1, map2)) {
  //     isupdate = false;
  //   } else {
  //     isupdate = true;
  //   }
  //   if (!isupdate) {
  //     map1 = Immutable.fromJS(nextState);
  //     map2 = Immutable.fromJS(this.state);
  //     if (Immutable.is(map1, map2)) {
  //       isupdate = false;
  //     } else {
  //       isupdate = true;
  //     }
  //   }
  //   return isupdate;
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.vouch.vouch && nextProps.vouch.vouch.errorinfo){
      this.setState({submitdisable:true});
    }
  }

  render() {
    const {
      actions,
      auth,
      vouch,
      profile
    } = this.props;

    // if (vouch.vouch && vouch.vouch.errorinfo) {
    //   Alert.alert('错误提示', vouch.vouch.errorinfo, [{
    //     text: '确定'
    //   }]);
    // } else if (vouch.vouchs && vouch.vouchs.errorinfo) {
    //   Alert.alert('错误提示', vouch.vouchs.errorinfo, [{
    //     text: '确定'
    //   }]);
    // }
    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    let curvouch = {
      outwhname: '',
      inwhname: '',
      vendorname: '',
      vcode: '',
      vdate: '',
      memo: '',
      sourceid: ''
    };
    let curvouchs = [];
    let scrollvouchs = [];

    if (vouch.vouch && vouch.vouch.data && vouch.vouch.data.length>0) {
      let vchdata = vouch.vouch.data[0];
      if (vchdata && vchdata.DT_RowId.substr(4) == this.state.vouchid) {
        curvouch.outwhname = vchdata.OutWarehouse.Name;
        curvouch.inwhname = vchdata.InWarehouse.Name;
        curvouch.vendorname = vchdata.Vendor.Name;
        curvouch.vcode = vchdata.Vouch.Code;
        curvouch.vdate = vchdata.Vouch.VouchDate;
        curvouch.memo = vchdata.Vouch.Memo;
        curvouch.sourceid = vchdata.Vouch.SourceId;
      }
    }

    let vouchtypetmp = this.props.vouchType;
    if (vouchtypetmp == '006001') {
      vouchtypetmp = '006'
    } else if (vouchtypetmp == '009001') {
      vouchtypetmp = '009'
    }
    let inwhtoptitle = '收货仓：';
    if (vouchtypetmp == '012') {
      inwhtoptitle = '叫货仓：';
    } else if (vouchtypetmp == '003') {
      curvouch.outwhname = this.props.fromWhName;
    } else if (vouchtypetmp == '014' || vouchtypetmp == '006') {
      inwhtoptitle = '生产仓：';
    } else if (vouchtypetmp == '001') {
      inwhtoptitle = '采购仓：';
    }
    if (vouch.vouchs) {
      curvouchs = vouch.vouchs.data;
      for (var i in curvouchs) {
        if (curvouchs[i].Vouchs.VouchId == this.state.vouchid) {
          scrollvouchs.push(<VouchsScrollRow key={i} vouchs={curvouchs[i]} vouchType={vouchtypetmp} auth={auth} actions={actions} isVerify={false} />);
        }
      }
    }
    if (vouchtypetmp == '003') {
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={styles.inputblocktop}>
            <Text style={styles.toptext} allowFontScaling={false}>
              {curvouch.vcode}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              {inwhtoptitle}{curvouch.inwhname}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              发货仓：{curvouch.outwhname}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              日  期：{curvouch.vdate}
            </Text>
            <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
              备  注：{curvouch.memo}
            </Text>
          </View>
          <ScrollView style={styles.scoll}>
            {scrollvouchs}
          </ScrollView>
          <View style={styles.buttonblock}>
            <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
              disabled={this.state.submitdisable} onPress={()=>this.verifyVouch()}>
              <Text style={styles.buttontext} allowFontScaling={false}>审  核</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else if (vouchtypetmp == '014' || vouchtypetmp == '006') {
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={styles.inputblocktop}>
            <Text style={styles.toptext} allowFontScaling={false}>
              {curvouch.vcode}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              {inwhtoptitle}{curvouch.inwhname}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              日  期：{curvouch.vdate}
            </Text>
            <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
              备  注：{curvouch.memo}
            </Text>
          </View>
          <ScrollView style={styles.scoll}>
            {scrollvouchs}
          </ScrollView>
          <View style={styles.buttonblock}>
            <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
              disabled={this.state.submitdisable} onPress={()=>this.verifyVouch()}>
              <Text style={styles.buttontext} allowFontScaling={false}>审  核</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else if (vouchtypetmp == '001') {
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <TouchableOpacity style={styles.inputblocktop} onPress={()=>this.editVouch()}>
            <View>
              <Text style={styles.toptext} allowFontScaling={false}>
                {curvouch.vcode}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                {inwhtoptitle}{curvouch.inwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                供应商：{curvouch.vendorname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                日  期：{curvouch.vdate}
              </Text>
              <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
                备  注：{curvouch.memo}
              </Text>
            </View>
          </TouchableOpacity>
          <ScrollView style={styles.scoll}>
            {scrollvouchs}
          </ScrollView>
          <View style={styles.buttonblock}>
            <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
              disabled={this.state.submitdisable} onPress={()=>this.verifyVouch()}>
              <Text style={styles.buttontext} allowFontScaling={false}>审  核</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else if (vouchtypetmp == '009') {
      if (curvouch.sourceid != '' && curvouch.sourceid > 0) {
        return (
          <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={styles.inputblocktop}>
            <Text style={styles.toptext} allowFontScaling={false}>
              {curvouch.vcode}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              {inwhtoptitle}{curvouch.inwhname}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              发货仓：{curvouch.outwhname}
            </Text>
            <Text style={styles.toptext} allowFontScaling={false}>
              日  期：{curvouch.vdate}
            </Text>
            <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
              备  注：{curvouch.memo}
            </Text>
          </View>
          <ScrollView style={styles.scoll}>
            {scrollvouchs}
          </ScrollView>
          <View style={styles.buttonblock}>
            <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
              disabled={this.state.submitdisable} onPress={()=>this.verifyVouch()}>
              <Text style={styles.buttontext} allowFontScaling={false}>审  核</Text>
            </TouchableHighlight>
          </View>
        </View>
        );
      } else {
        return (
          <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <TouchableOpacity style={styles.inputblocktop} onPress={()=>this.editVouch()}>
            <View>
              <Text style={styles.toptext} allowFontScaling={false}>
                {curvouch.vcode}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                {inwhtoptitle}{curvouch.inwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                发货仓：{curvouch.outwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                日  期：{curvouch.vdate}
              </Text>
              <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
                备  注：{curvouch.memo}
              </Text>
            </View>
          </TouchableOpacity>
          <ScrollView style={styles.scoll}>
            {scrollvouchs}
          </ScrollView>
          <View style={styles.buttonblock}>
            <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
              disabled={this.state.submitdisable} onPress={()=>this.verifyVouch()}>
              <Text style={styles.buttontext} allowFontScaling={false}>审  核</Text>
            </TouchableHighlight>
          </View>
        </View>
        );
      }
    } else {
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <TouchableOpacity style={styles.inputblocktop} onPress={()=>this.editVouch()}>
            <View>
              <Text style={styles.toptext} allowFontScaling={false}>
                {curvouch.vcode}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                {inwhtoptitle}{curvouch.inwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                发货仓：{curvouch.outwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                日  期：{curvouch.vdate}
              </Text>
              <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
                备  注：{curvouch.memo}
              </Text>
            </View>
          </TouchableOpacity>
          <ScrollView style={styles.scoll}>
            {scrollvouchs}
          </ScrollView>
          <View style={styles.buttonblock}>
            <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
              disabled={this.state.submitdisable} onPress={()=>this.verifyVouch()}>
              <Text style={styles.buttontext} allowFontScaling={false}>审  核</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}



function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadVouch);