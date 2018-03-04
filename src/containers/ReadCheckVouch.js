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
  ListView
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
    color: '#FE8F45',
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
  lists: {
    flex: 1,
    justifyContent: 'flex-start'
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
  },
  invitem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  leftview: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10
  },
  leftcircyle: {
    backgroundColor: '#FEB381',
    borderWidth: 0.5,
    borderColor: '#FE8F45',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingTop: 2,
    paddingBottom: 3,
  },
  invnameicon: {
    color: '#ffffff'
  },
  midview: {
    flex: 1
  },
  middetailview: {
    flex: 1,
    flexDirection: 'row'
  },
  midspec: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  midtitle: {
    fontSize: 16,
    color: '#000000'
  },
  middetailviewright: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  textinfobatch: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  rightview: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  rightviewrow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  rightviewrowright: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  numtext: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'flex-end'
  },
  unittext: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  amounttext: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  invitembutton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  invitemleft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 10
  },
  midtitlelview: {
    flex: 1
  },
  invitemright: {
    flex: 0,
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderColor: '#cacaca',
    paddingLeft: 10,
    paddingRight: 10
  },
});

class ReadCheckVouch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vouchid: this.props.vouchId,
      submitdisable:false,
      dataSource: null
    }
    this._curshowdata = [];
    this.renderRow = this.renderRow.bind(this);
    this.editVouch = this.editVouch.bind(this);
    this.verifyVouch = this.verifyVouch.bind(this);
    this.getMoreRow = this.getMoreRow.bind(this);
    this.unverifyVouch = this.unverifyVouch.bind(this);
    this.delVouchs = this.delVouchs.bind(this);
  }

  editVouch() {
    if (this.state.vouchid == '' || this.state.vouchid == '0') {
      Alert.alert('错误提示', '参数错误，无法编辑，请刷新后重试', [{
        text: '确定'
      }]);
    } else {
      Actions.EditVouch({
        vouchId: this.state.vouchid,
        vouchType: this.props.vouchType
      });
    }
  }

  delVouchs(row) {
    const {
      actions,
      auth
    } = this.props;
    console.log(row);
    let alertmsg = '是否确认要删除：\n' + row.Inventory.Name;
    Alert.alert('请确认', alertmsg, [{
      text: '取消',
      onPress: () => {}
    }, {
      text: '确认',
      onPress: () => {
        let rowId=row.DT_RowId;
        let data = {
          action: 'remove',
          data: {}
        };
        data.data[rowId] = {
          DT_RowId: rowId,
          Vouchs: {
            InvId: row.Vouchs.InvId,
            VouchId: row.Vouchs.VouchId
          }
        };
        actions.vouchs(auth.token.access_token, data,auth.info.api);
      }
    }]);
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
    }else if (this.props.busType == '' || this.props.busType == null) {
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
      }else{
        if (this.props.vouchType === '010') {
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
          if(this.props.vouchType === '016'){
            data.data['row_' + this.state.vouchid] = {
              Vouch: {
                IsVerify: true,
                VouchType: this.props.vouchType,
                BusType: this.props.busType
              }
            };
          }else{
            data.data['row_' + this.state.vouchid] = {
              Vouch: {
                IsVerify: true,
                VouchType: this.props.vouchType
              }
            };
          }
          actions.vouch(auth.token.access_token, this.props.vouchType, data,auth.info.api)
            .then(()=>{this.setState({submitdisable:false})});
          this.timer = setTimeout(() => {
            actions.getVouch(auth.token.access_token, {
              VouchType: this.props.vouchType,
              IsVerify: false,
              VouchDate: ''
            },auth.info.api);
          }, 500);
        } else {
          Alert.alert('明细错误', '单据明细中有缺少批次的记录', [{
            text: '确定'
          }]);
          this.setState({submitdisable:false});
        }
      }
    }
  }

  unverifyVouch() {
    const {
      actions,
      auth,
      vouch
    } = this.props;
    this.setState({submitdisable:true});
    if (this.state.vouchid == '' || this.state.vouchid == '0') {
      Alert.alert('错误提示', '参数错误，无法弃审，请刷新后重试', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.props.busType == '' || this.props.busType == null) {
      Alert.alert('错误提示', '参数错误，无法审核，请刷新后重试', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else {
      let data = {
        action: 'unverify',
        data: {}
      };
      if(this.props.vouchType === '016'){
        data.data['row_' + this.state.vouchid] = {
          Vouch: {
            IsVerify: false,
            VouchType: this.props.vouchType,
            BusType: this.props.busType
          }
        };
      }else{
        data.data['row_' + this.state.vouchid] = {
          Vouch: {
            IsVerify: false,
            VouchType: this.props.vouchType
          }
        };
      }
      actions.vouch(auth.token.access_token, this.props.vouchType, data,auth.info.api)
        .then(()=>{this.setState({submitdisable:false})});
      this.timer = setTimeout(() => {
        actions.getVouch(auth.token.access_token, {
          VouchType: this.props.vouchType,
          IsVerify: true,
          VouchDate: ''
        },auth.info.api);
      }, 500);
    }
  }

  componentWillMount() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: ds.cloneWithRows(this._curshowdata)
    });
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
        },{
          data: 'Inventory.Code',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '',
            regex: false
          }
        }],
        order: [{
          column: 0,
          dir: 'asc'
        },{
          column: 1,
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

  getMoreRow() {
    const {
      vouch
    } = this.props;
    if(vouch.vouchs && vouch.vouchs.data && vouch.vouchs.data.length>0 && this._curshowdata.length>0){
      if (vouch.vouchs.data.length > this._curshowdata.length) {
        var addcountindex=this._curshowdata.length+10;
        if(addcountindex>=vouch.vouchs.data.length){
          addcountindex=vouch.vouchs.data.length;
        }
        for(var i=this._curshowdata.length;i<addcountindex;i++){
          this._curshowdata.push(vouch.vouchs.data[i]);
        }
        if(addcountindex===vouch.vouchs.data.length){
          this._curshowdata.push({DT_RowId:'footer'});
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._curshowdata)
        });
      }
    }
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData && rowData.DT_RowId!=='footer') {
      let invnamefirst = rowData.Inventory.Name.substr(0, 1);
      if(this.props.isVerify===true){
        if(this.props.vouchType==='010'){
          return (
            <View style={styles.invitem}>
              <View style={styles.leftview}>
                <View style={styles.leftcircyle}>
                  <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                </View>
              </View>
              <View style={styles.midview}>
                <View style={styles.middetailview}>
                  <Text style={styles.midspec} allowFontScaling={false}>{rowData.Inventory.Specs}</Text>
                  <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{rowData.Vouchs.Batch}</Text>
                </View>
                <View style={styles.middetailview}>
                  <Text style={styles.midtitle} allowFontScaling={false}>{rowData.Inventory.Name}</Text>
                </View>
                <View style={styles.middetailviewright}>
                  <Text style={styles.textinfobatch} allowFontScaling={false}>{rowData.Vouchs.MadeDate} |</Text>
                  <Text style={styles.textinfobatch} allowFontScaling={false}> {rowData.Vouchs.InvalidDate}</Text>
                </View>
              </View>
              <View style={styles.invitemright}>
                <View style={styles.rightviewrow}>
                  <Text style={styles.unittext} allowFontScaling={false}>{rowData.Vouchs.Num}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{rowData.UOM.Name}x{rowData.Vouchs.Price}</Text>
                </View>
                  <View style={styles.rightviewrowright}>
                    <Text style={styles.numtext} allowFontScaling={false}>{rowData.Vouchs.CNum}</Text>
                    <Text style={styles.unittext} allowFontScaling={false}>{rowData.UOM.Name}</Text>
                  </View>
              </View>
            </View>
          );
        }else{
          return (
            <View style={styles.invitem}>
              <View style={styles.leftview}>
                <View style={styles.leftcircyle}>
                  <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                </View>
              </View>
              <View style={styles.midview}>
                <View style={styles.middetailview}>
                  <Text style={styles.midspec} allowFontScaling={false}>{rowData.Inventory.Specs}</Text>
                </View>
                <View style={styles.middetailview}>
                  <Text style={styles.midtitle} allowFontScaling={false}>{rowData.Inventory.Name}</Text>
                </View>
              </View>
              <View style={styles.invitemright}>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.numtext} allowFontScaling={false}>{rowData.Vouchs.Num}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{rowData.UOM.Name}</Text>
                </View>
              </View>
            </View>
          );
        }
      }else{
        if(this.props.vouchType==='010'){
          return (
            <View style={styles.invitembutton}>
              <TouchableOpacity style={styles.invitemleft} onPress={()=>Actions.VouchsEdit({vouchsid:rowData.DT_RowId.substr(4),vouchType:this.props.vouchType})}>
                <View style={styles.leftview}>
                  <View style={styles.leftcircyle}>
                    <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                  </View>
                </View>
                <View style={styles.midview}>
                  <View style={styles.middetailview}>
                    <Text style={styles.midspec} allowFontScaling={false}>{rowData.Inventory.Specs}</Text>
                    <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{rowData.Vouchs.Batch}</Text>
                  </View>
                  <View style={styles.midtitlelview}>
                    <Text style={styles.midtitle} allowFontScaling={false}>{rowData.Inventory.Name}</Text>
                  </View>
                  <View style={styles.middetailviewright}>
                    <Text style={styles.textinfobatch} allowFontScaling={false}>{rowData.Vouchs.MadeDate} |</Text>
                    <Text style={styles.textinfobatch} allowFontScaling={false}> {rowData.Vouchs.InvalidDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.invitemright} onPress={()=>this.delVouchs(rowData)}>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.icon} allowFontScaling={false}>
                    {icon('close')}
                  </Text>
                </View>
                <View style={styles.rightviewrow}>
                  <Text style={styles.unittext} allowFontScaling={false}>{rowData.Vouchs.Num}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{rowData.UOM.Name}x{rowData.Vouchs.Price}</Text>
                </View>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.numtext} allowFontScaling={false}>{rowData.Vouchs.CNum}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{rowData.UOM.Name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }else{
          return (
            <View style={styles.invitembutton}>
              <TouchableOpacity style={styles.invitemleft} onPress={()=>Actions.VouchsEdit({vouchsid:rowData.DT_RowId.substr(4),vouchType:this.props.vouchType})}>
                <View style={styles.leftview}>
                  <View style={styles.leftcircyle}>
                    <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                  </View>
                </View>
                <View style={styles.midview}>
                  <View style={styles.middetailview}>
                    <Text style={styles.midspec} allowFontScaling={false}>{rowData.Inventory.Specs}</Text>
                  </View>
                  <View style={styles.midtitlelview}>
                    <Text style={styles.midtitle} allowFontScaling={false}>{rowData.Inventory.Name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.invitemright} onPress={()=>this.delVouchs(rowData)}>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.icon} allowFontScaling={false}>
                    {icon('close')}
                  </Text>
                </View>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.numtext} allowFontScaling={false}>{rowData.Vouchs.Num}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{rowData.UOM.Name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }
      }
    }else if(rowData && rowData.DT_RowId==='footer'){
      return (
        <View style={styles.invitem}>
          <View>
            <Text allowFontScaling={false}>已经到底了</Text>
          </View>
        </View>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.vouch.vouch && nextProps.vouch.vouch.errorinfo){
      this.setState({submitdisable:true});
    }else{
      let vouch = nextProps.vouch;
      if(vouch && !vouch.isFetching && vouch.vouchs && vouch.vouchs.data && vouch.vouchs.data.length>0 && this._curshowdata.length===0){
        var loadcnt=10;
        if(vouch.vouchs.data.length<loadcnt){
          loadcnt=vouch.vouchs.data.length;
        }
        for(var i=0;i<loadcnt;i++){
          this._curshowdata.push(vouch.vouchs.data[i]);
        }
        if(this._curshowdata.length===vouch.vouchs.data.length){
          this._curshowdata.push({DT_RowId:'footer'});
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._curshowdata)
        });
      }else if(vouch && this.props.vouch && !vouch.isFetching && vouch.vouchs && this.props.vouch.vouchs){
        map1 = Immutable.fromJS(vouch.vouchs.data);
        map2 = Immutable.fromJS(this.props.vouch.vouchs.data);
        if (!Immutable.is(map1, map2)) {
          var loadcnt=this._curshowdata.length;
          if(vouch.vouchs.data.length<loadcnt){
            loadcnt=vouch.vouchs.data.length;
          }
          this._curshowdata=[];
          for(var i=0;i<loadcnt;i++){
            this._curshowdata.push(vouch.vouchs.data[i]);
          }
          if(this._curshowdata.length===vouch.vouchs.data.length){
            this._curshowdata.push({DT_RowId:'footer'});
          }
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._curshowdata)
          });
        }
      }
    }
  }

  render() {
    const {
      actions,
      auth,
      vouch,
      profile
    } = this.props;

    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    let curvouch = {
      inwhname: '',
      vcode: '',
      vdate: '',
      memo: ''
    };

    if (vouch.vouch && vouch.vouch.data && vouch.vouch.data.length>0) {
      let vchdata = vouch.vouch.data[0];
      if (vchdata && vchdata.DT_RowId.substr(4) == this.state.vouchid) {
        curvouch.inwhname = vchdata.InWarehouse.Name;
        curvouch.vcode = vchdata.Vouch.Code;
        curvouch.vdate = vchdata.Vouch.VouchDate;
        curvouch.memo = vchdata.Vouch.Memo;
      }
    }
    let busname='';
    if(this.props.busType==='023'){
      busname='产成品';
    }else if(this.props.busType==='024'){
      busname='半成品';
    }else if(this.props.busType==='025'){
      busname='原材料';
    }

    if(this.props.vouchType==='016'){
      if(this.props.isVerify===true){
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
                盘点仓：{curvouch.inwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                业务类型：{busname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                日  期：{curvouch.vdate}
              </Text>
              <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
                备  注：{curvouch.memo}
              </Text>
            </View>
            <View style={styles.lists}>
              <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={ this.renderRow }
                onEndReachedThreshold={5}
                onEndReached={this.getMoreRow}
                initialListSize={10}
                pageSize={10}
              />
            </View>
            <View style={styles.buttonblock}>
              <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
                disabled={this.state.submitdisable} onPress={()=>this.unverifyVouch()}>
                <Text style={styles.buttontext} allowFontScaling={false}>弃  审</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      }else{
        return (
          <View style={styles.container}>
            <Modal visible={vouch.isFetching}
              onRequestClose={()=>{return false;}} transparent={true} >
              <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
            </Modal>
            <TouchableOpacity style={styles.inputblocktop} onPress={()=>this.editVouch()}>
              <Text style={styles.toptext} allowFontScaling={false}>
                {curvouch.vcode}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                盘点仓：{curvouch.inwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                业务类型：{busname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                日  期：{curvouch.vdate}
              </Text>
              <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
                备  注：{curvouch.memo}
              </Text>
            </TouchableOpacity>
            <View style={styles.lists}>
              <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={ this.renderRow }
                onEndReachedThreshold={10}
                onEndReached={this.getMoreRow}
                initialListSize={10}
                pageSize={10}
              />
            </View>
            <View style={styles.buttonblock}>
              <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
                disabled={this.state.submitdisable} onPress={()=>this.verifyVouch()}>
                <Text style={styles.buttontext} allowFontScaling={false}>审  核</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      }
    }else{
      if(this.props.isVerify===true){
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
                盘点仓：{curvouch.inwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                日  期：{curvouch.vdate}
              </Text>
              <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
                备  注：{curvouch.memo}
              </Text>
            </View>
            <View style={styles.lists}>
              <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={ this.renderRow }
                onEndReachedThreshold={5}
                onEndReached={this.getMoreRow}
                initialListSize={10}
                pageSize={10}
              />
            </View>
            <View style={styles.buttonblock}>
              <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
                disabled={this.state.submitdisable} onPress={()=>this.unverifyVouch()}>
                <Text style={styles.buttontext} allowFontScaling={false}>弃  审</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
      }else{
        return (
          <View style={styles.container}>
            <Modal visible={vouch.isFetching}
              onRequestClose={()=>{return false;}} transparent={true} >
              <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
            </Modal>
            <TouchableOpacity style={styles.inputblocktop} onPress={()=>this.editVouch()}>
              <Text style={styles.toptext} allowFontScaling={false}>
                {curvouch.vcode}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                盘点仓：{curvouch.inwhname}
              </Text>
              <Text style={styles.toptext} allowFontScaling={false}>
                日  期：{curvouch.vdate}
              </Text>
              <Text style={[styles.toptext,{paddingBottom:5}]} allowFontScaling={false}>
                备  注：{curvouch.memo}
              </Text>
            </TouchableOpacity>
            <View style={styles.lists}>
              <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={ this.renderRow }
                onEndReachedThreshold={10}
                onEndReached={this.getMoreRow}
                initialListSize={10}
                pageSize={10}
              />
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadCheckVouch);