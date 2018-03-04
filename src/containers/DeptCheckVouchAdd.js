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
import Toast from 'react-native-root-toast';
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

import InventoryPickerModal from '../components/InventoryPickerModal';
import CheckBalanceBusTypePicker from '../components/CheckBalanceBusTypePicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
  },
  inputblock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    height:48
  },
  inputblocktop: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5,
    height:48
  },
  inputblockgroup: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5,
    height:48
  },
  inputdiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft:20
  },
  inputcontroldiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  modalselect: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  modalselectvalue: {
    flex: 1,
    paddingLeft: 20,
    color: 'black',
    fontSize:16
  },
  iconmodalselect: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
    paddingRight: 10
  },
  labelinp: {
    fontSize: 16,
    alignSelf: 'center',
    width: 66,
    color: '#000'
  },
  textinfo: {
    fontSize: 16,
    color:'gray'
  },
  textinp: {
    flex:1,
    fontSize: 16,
    paddingLeft:0,
    paddingRight:11
  },
  buttonblock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FE8F45',
    padding: 10,
    borderRadius: 4,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  bodertop: {
    borderTopWidth: 0.5
  },
  modallay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalinner: {
    flex: 0,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 20
  },
  modaltitle: {
    padding: 10,
    fontSize: 18,
    color: '#FE8F45',
    borderBottomWidth: 2,
    borderColor: '#FE8F45'
  },
  horizontalLine: {
    marginTop: 5,
    height: 0.5,
    backgroundColor: '#FE8F45',
  },
  selectitem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5
  },
  itemtext: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10
  }
});

class DeptCheckVouchAdd extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let strday = date.getFullYear();
    if (date.getMonth() < 9) {
      strday += '-0' + (date.getMonth() + 1)
    } else {
      strday += '-' + (date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
      strday += '-0' + date.getDate();
    } else {
      strday += '-' + date.getDate();
    }
    this.state = {
      invid: '',
      invname: '请选择',
      specs: '-',
      unit: '-',
      num: '',
      bustype:'',
      vouchdate: strday,
      invmodalshow: false,
      submitdisable:false
    }
    this.invSelectHandler = this.invSelectHandler.bind(this);
    this.modalSetVisible = this.modalSetVisible.bind(this);
    this.busTypeChange = this.busTypeChange.bind(this);
    this.submitAddVouchAndVouchs = this.submitAddVouchAndVouchs.bind(this);
  }

  modalSetVisible(visible) {
    if(visible===true){
      if(this.state.bustype=='' || this.state.bustype==null || this.state.bustype=='0'){
        Alert.alert('提示', '请选择业务类型', [{
          text: '确定'
        }]);
      }else{
        this.setState({
          invmodalshow: visible
        });
      }
    }
  }

  invSelectHandler(selinvid) {
    const {
      vouch
    } = this.props;
    if(vouch.vouchs && vouch.vouchs.options){
      var options = vouch.vouchs.options['Vouchs.InvId'];
      for (var i in options) {
        if (options[i].value == selinvid) {
          var strspecs = '-';
          var strunit = '-';
          if (options[i].label.Specs) {
            strspecs = options[i].label.Specs;
          }
          if (options[i].label.StockUOMName) {
            strunit = options[i].label.StockUOMName;
          }
          this.setState({
            invname: options[i].label.Name,
            specs: strspecs,
            unit: strunit,
            invmodalshow: false
          });
          break;
        }
      }
    }

    if (selinvid == '') {
      this.setState({
        invname: '请选择',
        specs: '',
        unit: '',
        invmodalshow: false
      });
    }
  }

  busTypeChange(selbtp){
    this.setState({
      bustype:selbtp,
      invname: '请选择',
      specs: '',
      unit: '',
      invmodalshow: false
    });
  }

  submitAddVouchAndVouchs() {
    const {
      actions,
      auth,
      profile
    } = this.props;
    this.setState({submitdisable:true});
    if (profile.user.whId == null || profile.user.whId == '') {
      Alert.alert('提示', '用户不属于任何仓库，请联系系统管理员配置用户所属仓库', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.bustype == null || this.state.bustype == ''|| this.state.bustype == '0') {
      Alert.alert('提示', '请选择业务类型', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.invid == null || this.state.invid == ''|| this.state.invid == '0') {
      Alert.alert('提示', '请选择存货', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.num == null || this.state.num == '' || parseFloat(this.state.num) < 0) {
      Alert.alert('提示', '请输入有效数量', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else {
      let vouchData = {
        action: 'create',
        data: [{
          Vouch: {
            VouchType: '016',
            BusType: this.state.bustype,
            Step: 0,
            ToWhId: profile.user.whId,
            VouchDate: this.state.vouchdate,
            Memo: null
          }
        }]
      };
      let vouchsData = {
        action: 'create',
        data: [{
          Vouchs: {
            VouchId: 0,
            InvId: this.state.invid,
            Num: this.state.num,
            Memo: null
          }
        }]
      };
      actions.vouchAndVouchs(auth.token.access_token, '016', vouchData, vouchsData,auth.info.api)
        .then(()=>{this.setState({submitdisable:false})});
      this.timer = setTimeout(() => {
        actions.getVouch(auth.token.access_token, {
          VouchType: '016',
          IsVerify: false,
          VouchDate: ''
        },auth.info.api);
      }, 500);
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  componentDidMount() {
    const {
      actions,
      auth,
      vouch
    } = this.props;
    let isrequest = false;
    if (vouch.vouch && vouch.vouch.options && vouch.vouch.options['Vouch.ToWhId']) {
      isrequest = false;
    } else {
      isrequest = true;
    }
    if (!isrequest) {
      if (vouch.vouchs && vouch.vouchs.options && vouch.vouchs.options['Vouchs.InvId']) {
        isrequest = false;
      } else {
        isrequest = true;
      }
    }

    if (isrequest) {
      let data = {
        draw: 1,
        columns: [{
          data: 'DT_RowId',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=0',
            regex: false
          }
        }, {
          data: 'Vouch.VouchType',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=016',
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
      let datavouchs = {
        draw: 1,
        columns: [{
          data: 'DT_RowId',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=0',
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
      actions.vouchAndVouchs(auth.token.access_token, '016', data, datavouchs,auth.info.api);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    isupdate = false;
    if (nextProps.vouch.vouch && nextProps.vouch.vouch.data && nextProps.vouch.vouch.data.length > 0) {
      isupdate = false;
    } else {
      isupdate = true;
    }
    if (!isupdate) {
      map1 = Immutable.fromJS(nextState);
      map2 = Immutable.fromJS(this.state);
      if (Immutable.is(map1, map2)) {
        isupdate = false;
      } else {
        isupdate = true;
      }
    }
    return isupdate;
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
    return (
      <View style={styles.container}>
        <ScrollView>
        <Modal visible={vouch.isFetching}
          onRequestClose={()=>{return false;}} transparent={true} 
        >
          <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
        </Modal>
        <Modal visible={this.state.invmodalshow}
          onRequestClose={()=>{this.modalSetVisible(false)}}>
          <InventoryPickerModal 
            vouchs={vouch.vouchs} 
            value={this.state.invid}
            vouchType='016'
            busType={this.state.bustype} 
            onValueChange={(invid) => {this.setState({invid: invid});this.invSelectHandler(invid);}} />
        </Modal>
        <View style={styles.inputblocktop}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            盘点仓库
          </Text>
          <View style={styles.inputdiv}>
            <Text style={styles.textinfo} allowFontScaling={false}>{profile.user.whName}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.inputblock} >
          <Text style={styles.labelinp} allowFontScaling={false}>
            业务类型
          </Text>
          <View style={styles.inputcontroldiv}>
            <CheckBalanceBusTypePicker
              value={this.state.bustype}
              onValueChange={(btp) => this.busTypeChange(btp)} />
            <Text style={styles.icon} allowFontScaling={false}>
              {icon('qiehuanqiyou')}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.inputblockgroup,styles.bodertop]}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            存货
          </Text>
          <TouchableOpacity style={styles.modalselect} onPress={()=>this.modalSetVisible(true)}>
            <Text style={styles.modalselectvalue} allowFontScaling={false}>{this.state.invname}</Text>
            <Text style={styles.iconmodalselect} allowFontScaling={false}>
              {icon('qiehuanqiyou')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputblockgroup}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            规格型号
          </Text>
          <View style={styles.inputdiv}>
            <Text style={styles.textinfo} allowFontScaling={false}>{this.state.specs}</Text>
          </View>
        </View>
        <View style={styles.inputblocktop}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            计量单位
          </Text>
          <View style={styles.inputdiv}>
            <Text style={styles.textinfo} allowFontScaling={false}>{this.state.unit}</Text>
          </View>
        </View>
        <View style={styles.inputblock}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            盘点数
          </Text>
          <View style={styles.inputdiv}>
            <TextInput style={styles.textinp} placeholder='请输入盘点数' underlineColorAndroid='transparent' 
              keyboardType="numeric"
              onChangeText={(text) => {this.setState({num: text.replace(/\s/g, '')});}}>
            </TextInput>
          </View>
        </View>
        </ScrollView>
        <View style={styles.buttonblock}>
          <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
            disabled={this.state.submitdisable} onPress={()=>{this.submitAddVouchAndVouchs();}}>
            <Text style={styles.buttontext} allowFontScaling={false}>提  交</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DeptCheckVouchAdd);