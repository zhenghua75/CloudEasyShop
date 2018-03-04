import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Picker,
  Modal,
  ActivityIndicator,
  Dimensions,
  Alert
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

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

import WareHousePicker from '../components/WareHousePicker';
import VendorPicker from '../components/VendorPicker';

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
    marginBottom: 15,
    marginTop: 20,
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
  }
});

class EditVouch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromwhid: this.props.vouch.vouch.data ? this.props.vouch.vouch.data[0].Vouch.FromWhId : '',
      towhid: this.props.vouch.vouch.data ? this.props.vouch.vouch.data[0].Vouch.ToWhId : '',
      vouchdate: this.props.vouch.vouch.data ? this.props.vouch.vouch.data[0].Vouch.VouchDate : '',
      memo: this.props.vouch.vouch.data ? this.props.vouch.vouch.data[0].Vouch.Memo : '',
      venid: this.props.vouch.vouch.data ? this.props.vouch.vouch.data[0].Vouch.VenId : '',
      vouchtype: this.props.vouchType,
      vouchid: this.props.vouchId,
      submitdisable:false
    }
    this.submitEditVouch = this.submitEditVouch.bind(this);
  }

  submitEditVouch() {
    const {
      actions,
      auth
    } = this.props;
    this.setState({submitdisable:true});
    if (this.state.vouchid == '' || this.state.vouchid == '0') {
      Alert.alert('错误提示', '参数错误，无法修改，请刷新后重试', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    }else if (this.state.vouchdate == '' || this.state.vouchdate == null) {
      Alert.alert('错误提示', '请选择日期', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    }else if (this.props.vouchType!='010' && this.props.vouchType!='016'  && (this.state.fromwhid == '' || this.state.fromwhid == null || this.state.fromwhid == '0')) {
      Alert.alert('错误提示', '请选择仓库', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    }else if (this.state.towhid == '' || this.state.towhid == null || this.state.towhid == '0') {
      Alert.alert('错误提示', '请选择仓库', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    }else{
      let data = {
        action: 'edit',
        data: {}
      };
      let rowid = 'row_' + this.state.vouchid;
      if(this.props.vouchType=='010' || this.props.vouchType=='016'){
        data.data[rowid] = {
          Vouch: {
            VouchType: this.state.vouchtype,
            VouchDate: this.state.vouchdate,
            ToWhId: this.state.towhid,
            Memo: this.state.memo
          }
        }
      }else{
        data.data[rowid] = {
          Vouch: {
            VouchType: this.state.vouchtype,
            VouchDate: this.state.vouchdate,
            FromWhId: this.state.fromwhid,
            ToWhId: this.state.towhid,
            Memo: this.state.memo
          }
        }
      }

      if (this.state.vouchtype == '001') {
        data.data[rowid].Vouch.VenId = this.state.venid;
      }
      actions.vouch(auth.token.access_token, this.state.vouchtype, data,auth.info.api)
        .then(()=>{this.setState({submitdisable:false})});
    }
  }

  render() {
    const {
      actions,
      auth,
      vouch
    } = this.props;

    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    let maxwidth = Dimensions.get('window').width;
    let datewidth = maxwidth - 100;
    let curvouchcode = '';
    let curwhname = '';
    let curoutwhname = '';
    if (vouch.vouch && vouch.vouch.data) {
      let vchdata = vouch.vouch.data[0];
      if (vchdata && vchdata.DT_RowId.substr(4) == this.state.vouchid) {
        curvouchcode = vchdata.Vouch.Code;
        curwhname = vchdata.InWarehouse.Name;
        curoutwhname = vchdata.OutWarehouse.Name;
      }
    }
    if (this.state.vouchtype == '012') {
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单号
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{curvouchcode}</Text>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]} >
            <Text style={styles.labelinp} allowFontScaling={false}>
              生产仓库
            </Text>
            <View style={styles.inputcontroldiv}>
              <WareHousePicker
                vouch={vouch.vouch}
                value={this.state.fromwhid}
                onValueChange={(fwhid) => {this.setState({fromwhid: fwhid});}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单据日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.vouchdate} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start'},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate="2000-01-01" maxDate="2100-12-31" showIcon={false}
                onDateChange={(date) => {this.setState({vouchdate: date})}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              备注
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} underlineColorAndroid='transparent' value={this.state.memo}
                onChangeText={(text) => {this.setState({memo: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.buttonblock}>
            <TouchableOpacity style={[styles.button,submitdiscolor]} 
              disabled={this.state.submitdisable} onPress={()=>{this.submitEditVouch();}}>
              <Text style={styles.buttontext} allowFontScaling={false}>提  交</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.vouchtype == '001') {
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单号
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{curvouchcode}</Text>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]} >
            <Text style={styles.labelinp} allowFontScaling={false}>
              采购仓库
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{curwhname}</Text>
            </View>
          </View>
          <View style={styles.inputblockgroup} >
            <Text style={styles.labelinp} allowFontScaling={false}>
              供应商
            </Text>
            <View style={styles.inputcontroldiv}>
              <VendorPicker
                vouch={vouch.vouch}
                value={this.state.venid}
                onValueChange={(ven_id) => {this.setState({venid: ven_id});}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单据日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.vouchdate} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start'},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate="2000-01-01" maxDate="2100-12-31" showIcon={false}
                onDateChange={(date) => {this.setState({vouchdate: date})}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              备注
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} underlineColorAndroid='transparent' value={this.state.memo}
                onChangeText={(text) => {this.setState({memo: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.buttonblock}>
            <TouchableOpacity style={[styles.button,submitdiscolor]} 
              disabled={this.state.submitdisable} onPress={()=>{this.submitEditVouch();}}>
              <Text style={styles.buttontext} allowFontScaling={false}>提  交</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if(this.state.vouchtype == '010' || this.state.vouchtype == '016'){
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单号
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{curvouchcode}</Text>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]} >
            <Text style={styles.labelinp} allowFontScaling={false}>
              盘点仓库
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{curwhname}</Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单据日期
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{this.state.vouchdate}</Text>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              备注
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} underlineColorAndroid='transparent' value={this.state.memo}
                onChangeText={(text) => {this.setState({memo: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.buttonblock}>
            <TouchableOpacity style={[styles.button,submitdiscolor]} 
              disabled={this.state.submitdisable} onPress={()=>{this.submitEditVouch();}}>
              <Text style={styles.buttontext} allowFontScaling={false}>提  交</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }else {
      return (
        <View style={styles.container}>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单号
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{curvouchcode}</Text>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]} >
            <Text style={styles.labelinp} allowFontScaling={false}>
              发货仓
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{curoutwhname}</Text>
            </View>
          </View>
          <View style={styles.inputblockgroup} >
            <Text style={styles.labelinp} allowFontScaling={false}>
              收货仓
            </Text>
            <View style={styles.inputcontroldiv}>
              <WareHousePicker
                vouch={vouch.vouch}
                value={this.state.towhid}
                onValueChange={(towhid) => {this.setState({towhid: towhid});}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单据日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.vouchdate} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start'},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate="2000-01-01" maxDate="2100-12-31" showIcon={false}
                onDateChange={(date) => {this.setState({vouchdate: date})}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              备注
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} underlineColorAndroid='transparent' value={this.state.memo}
                onChangeText={(text) => {this.setState({memo: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.buttonblock}>
            <TouchableOpacity style={[styles.button,submitdiscolor]} 
              disabled={this.state.submitdisable} onPress={()=>{this.submitEditVouch();}}>
              <Text style={styles.buttontext} allowFontScaling={false}>提  交</Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditVouch);