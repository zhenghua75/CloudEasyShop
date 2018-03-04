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
  labelinp: {
    fontSize: 16,
    alignSelf: 'center',
    width: 66,
    color: '#000'
  },
  textinfo: {
    fontSize: 16
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
  }
});

class VouchsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invid: '',
      specs: '-',
      unit: '-',
      num: '0',
      vouchid: '',
      memo: '',
      invname: '请选择',
      invmodalshow: false,
      submitdisable:false
    }
    this.invSelectHandler = this.invSelectHandler.bind(this);
    this.submitAddVouchs = this.submitAddVouchs.bind(this);
    this.modalSetVisible = this.modalSetVisible.bind(this);
  }

  modalSetVisible(visible) {
    this.setState({
      invmodalshow: visible
    });
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

  submitAddVouchs() {
    const {
      actions,
      auth,
      vouch
    } = this.props;
    this.setState({submitdisable:true});
    if (this.state.vouchid == '' || this.state.vouchid == null || this.state.vouchid == '0') {
      Alert.alert('错误提示', '单据错误，请重试', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.invid == null || this.state.invid == '') {
      Alert.alert('提示', '请选择存货', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.num == null || this.state.num == '' || this.state.num == '0' || parseFloat(this.state.num) < 0) {
      Alert.alert('提示', '请输入有效数量', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else {
      let isexist = false;
      for (var i in vouch.vouchs.data) {
        if (vouch.vouchs.data[i].Vouchs.InvId == this.state.invid) {
          isexist = true;
          break;
        }
      }
      if (isexist) {
        Alert.alert('提示', '同一存货不能重复添加', [{
          text: '确定'
        }]);
        this.setState({submitdisable:false});
      } else {
        let vouchsData = {
          action: 'create',
          data: [{
            Vouchs: {
              VouchId: this.state.vouchid,
              InvId: this.state.invid,
              Num: this.state.num,
              Memo: this.state.memo
            }
          }]
        };
        actions.vouchs(auth.token.access_token, vouchsData,auth.info.api)
          .then(()=>{this.setState({submitdisable:false})});
      }
    }
  }

  componentWillMount() {
    const {
      vouch
    } = this.props;
    if(vouch.vouch && vouch.vouch.data){
      this.setState({
        vouchid: vouch.vouch.data[0].DT_RowId.substr(4)
      });
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
    let numtitle='数量';
    if(this.props.vouchType==='016'){
      numtitle='盘点数';
    }
    return (
      <View style={styles.container}>
        <ScrollView>
        <Modal visible={vouch.isFetching}
          onRequestClose={()=>{return false;}} transparent={true} >
          <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
        </Modal>
        <Modal visible={this.state.invmodalshow}
          onRequestClose={()=>{this.modalSetVisible(false)}}>
          <InventoryPickerModal 
            vouchs={vouch.vouchs} 
            value={this.state.invid}
            vouchType={this.props.vouchType}
            busType={this.props.busType}
            onValueChange={(invid) => {this.setState({invid: invid});this.invSelectHandler(invid);}} />
        </Modal>
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
        <View style={[styles.inputblockgroup,styles.bodertop]}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            {numtitle}
          </Text>
          <View style={styles.inputdiv}>
            <TextInput style={styles.textinp} placeholder='请输入数量' underlineColorAndroid='transparent' 
              keyboardType="numeric"
              onChangeText={(text) => {this.setState({num: text.replace(/\s/g, '')});}}>
            </TextInput>
          </View>
        </View>
        <View style={styles.inputblockgroup}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            备注
          </Text>
          <View style={styles.inputdiv}>
            <TextInput style={styles.textinp} underlineColorAndroid='transparent' value={this.state.memo}
              onChangeText={(text) => {this.setState({memo: text.replace(/\s/g, '')});}}>
            </TextInput>
          </View>
        </View>
        </ScrollView>
        <View style={styles.buttonblock}>
          <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
            disabled={this.state.submitdisable} onPress={this.submitAddVouchs}>
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

export default connect(mapStateToProps, mapDispatchToProps)(VouchsAdd);