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

import BatchPicker from '../components/BatchPicker';

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

class VouchsEditExIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vouchid: '',
      vouchsid: this.props.vouchsid,
      invid: '',
      num: '0',
      memo: '',
      batch: '',
      madedate: '',
      invaliddate: '',
      price: '',
      submitdisable:false
    }
    this.madedateChange = this.madedateChange.bind(this);
    this.submitSaveVouchs = this.submitSaveVouchs.bind(this);
  }

  madedateChange(date) {
    const {
      vouch
    } = this.props;
    let invopts = vouch.vouchs.options['Vouchs.InvId'];
    var strnewday = '';
    for (var i = 0; i < invopts.length; i++) {
      if (invopts[i].value == this.state.invid) {
        if (invopts[i].label.IsShelfLife == true) {
          var newday = new Date(date);
          switch (invopts[i].label.ShelfLifeType) {
            case 0:
              newday.setDate(newday.getDate() + invopts[i].label.ShelfLife);
              break;
            case 1:
              newday.setDate(newday.getDate() + invopts[i].label.ShelfLife * 7);
              break;
            case 2:
              newday.setMonth(newday.getMonth() + invopts[i].label.ShelfLife);
              break;
            case 3:
              newday.setYear(newday.getFullYear() + invopts[i].label.ShelfLife);
              break;
          }
          strnewday = moment(newday).format('YYYY-MM-DD');
        }
      }
    }
    this.setState({
      madedate: date,
      batch: date.replace(/-/g, ''),
      invaliddate: strnewday
    });
  }

  submitSaveVouchs() {
    const {
      actions,
      auth
    } = this.props;
    this.setState({submitdisable:true});
    if (this.state.vouchid == '' || this.state.vouchid == null || this.state.vouchid == '0') {
      Alert.alert('错误提示', '单据错误，请重试', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.vouchsid == '' || this.state.vouchsid == null || this.state.vouchsid == '0') {
      Alert.alert('错误提示', '单据错误，请重试', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.num == null || this.state.num == '' || this.state.num == '0' || parseFloat(this.state.num) < 0) {
      Alert.alert('提示', '请输入有效数量', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.batch == null || this.state.batch == '' || this.state.batch == '0') {
      Alert.alert('提示', '请输入批号', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (this.state.madedate == '' || this.state.invaliddate == '') {
      Alert.alert('提示', '生产日期或过期日期不正确', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else {
      let vouchsData = {
        action: 'edit',
        data: {}
      };
      vouchsData.data['row_' + this.state.vouchsid] = {
        Vouchs: {
          VouchId: this.state.vouchid,
          Num: this.state.num,
          Memo: this.state.memo,
          Batch: this.state.batch,
          MadeDate: this.state.madedate,
          InvalidDate: this.state.invaliddate,
          Price: this.state.price
        }
      }
      actions.vouchs(auth.token.access_token, vouchsData,auth.info.api)
        .then(()=>{this.setState({submitdisable:false})});
    }
  }

  componentWillMount() {
    const {
      vouch
    } = this.props;
    for (let i in vouch.vouchs.data) {
      if (vouch.vouchs.data[i].DT_RowId.substr(4) == this.state.vouchsid) {
        this.setState({
          invid: vouch.vouchs.data[i].Vouchs.InvId,
          vouchid: vouch.vouchs.data[i].Vouchs.VouchId,
          num: vouch.vouchs.data[i].Vouchs.Num.toString(),
          memo: vouch.vouchs.data[i].Vouchs.Memo,
          batch: vouch.vouchs.data[i].Vouchs.Batch,
          madedate: vouch.vouchs.data[i].Vouchs.MadeDate,
          invaliddate: vouch.vouchs.data[i].Vouchs.InvalidDate,
          price: vouch.vouchs.data[i].Vouchs.Price.toString()
        });
      }
    }
  }

  render() {
    const {
      actions,
      auth,
      vouch
    } = this.props;
    // if (vouch.vouchs && vouch.vouchs.errorinfo) {
    //   Alert.alert('错误提示', vouch.vouchs.errorinfo, [{
    //     text: '确定'
    //   }]);
    // }
    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    let invname = '';
    let specs = '';
    let unit = '';
    for (let i in vouch.vouchs.data) {
      if (vouch.vouchs.data[i].DT_RowId.substr(4) == this.state.vouchsid) {
        invname = vouch.vouchs.data[i].Inventory.Name;
        specs = vouch.vouchs.data[i].Inventory.Specs;
        unit = vouch.vouchs.data[i].UOM.Name;
      }
    }
    let maxwidth = Dimensions.get('window').width;
    let datewidth = maxwidth - 100;
    if (this.props.vouchType == '001') {
      return (
        <View style={styles.container}>
          <ScrollView>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={[styles.inputblockgroup,styles.bodertop]}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              存货
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{invname}</Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              规格型号
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{specs}</Text>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              计量单位
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{unit}</Text>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              数量
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} placeholder='请输入数量' underlineColorAndroid='transparent' 
                keyboardType="numeric" value={this.state.num}
                onChangeText={(text) => {this.setState({num: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单价
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} placeholder='请输入单价' underlineColorAndroid='transparent'
                value={this.state.price} keyboardType="numeric"
                onChangeText={(text) => {this.setState({price: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              批号
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} placeholder='请输入批号' underlineColorAndroid='transparent' value={this.state.batch}
                onChangeText={(text) => {this.setState({batch: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              生产日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.madedate} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start'},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate="2000-01-01" maxDate="2100-12-31" showIcon={false}
                onDateChange={(date) => this.madedateChange(date)} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              过期日期
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{this.state.invaliddate}</Text>
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
              disabled={this.state.submitdisable} onPress={()=>{this.submitSaveVouchs();}}>
              <Text style={styles.buttontext} allowFontScaling={false}>提  交</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
          <Modal visible={vouch.isFetching}
            onRequestClose={()=>{return false;}} transparent={true} >
            <ActivityIndicator style={styles.spinner} animating={vouch.isFetching} size='large' color='#FE8F45' />
          </Modal>
          <View style={[styles.inputblockgroup,styles.bodertop]}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              存货
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{invname}</Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              规格型号
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{specs}</Text>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              计量单位
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{unit}</Text>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              数量
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} placeholder='请输入数量' underlineColorAndroid='transparent' 
                keyboardType="numeric" value={this.state.num}
                onChangeText={(text) => {this.setState({num: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.inputblocktop}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              单价
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{this.state.price}</Text>
            </View>
          </View>
          <View style={[styles.inputblockgroup,styles.bodertop]}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              批号
            </Text>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} placeholder='请输入批号' underlineColorAndroid='transparent' value={this.state.batch}
                onChangeText={(text) => {this.setState({batch: text.replace(/\s/g, '')});}}>
              </TextInput>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              生产日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.madedate} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start'},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate="2000-01-01" maxDate="2100-12-31" showIcon={false}
                onDateChange={(date) => this.madedateChange(date)} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblockgroup}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              过期日期
            </Text>
            <View style={styles.inputdiv}>
              <Text style={styles.textinfo} allowFontScaling={false}>{this.state.invaliddate}</Text>
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
              disabled={this.state.submitdisable} onPress={()=>{this.submitSaveVouchs();}}>
              <Text style={styles.buttontext} allowFontScaling={false}>提  交</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(VouchsEditExIn);