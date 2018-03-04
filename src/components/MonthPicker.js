import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  Platform
} from 'react-native';
import icon from '../constants/iconfont.js';
import moment from 'moment';

const styles = StyleSheet.create({
  pickertouch: {
    flex: 1,
    marginLeft: 20
  },
  pickertouchbody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pickertext:{
    fontSize:16,
    color:'#000'
  },
  modalview:{
    flex:1,
    paddingTop: Platform.OS=='ios' ? 20 : 0,
    backgroundColor: '#F4F4F4'
  },
  navbar: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    height: 48,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5
  },
  navback:{
    width:65
  },
  navtitle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginRight:65
  },
  navtitletext:{
    fontSize:16,
    color:'#000'
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#FE8F45',
    paddingLeft: 10
  },
  pickercon: {
    flex:1,
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden'
  },
  pickeritem:{
    height:42,
    paddingLeft:20,
    paddingRight:20,
    justifyContent:'center'
  },
  pickeritemview:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca'
  },
  pickeritemtext:{
    flex:1,
    fontSize:16,
    color:'#000'
  },
  pickerselitemtext:{
    color:'#FE8F45',
    fontWeight:'bold'
  },
  pickerselitemicon:{
    fontFamily: 'iconfont',
    fontSize: 20,
    color: '#FE8F45',
    paddingRight:10
  }
});

export default class MonthPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    }

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onPressData = this.onPressData.bind(this);
    this.getPickerTitle = this.getPickerTitle.bind(this);
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  onPressCancel() {
    this.setModalVisible(false);
  }

  onPressConfirm(selvalue) {
    this.props.onValueChange(selvalue);
    this.setModalVisible(false);
  }

  onPressData() {
    this.setModalVisible(true);
  }

  getPickerTitle(){
    const {value} = this.props;
    if (!value) {
      return '请选择';
    }else{
      return value;
    }
  }

  render() {
    const {
      value
    } = this.props;
    let monthlist=[];
    for(var i=0;i<12;i++){
      var strmonth=moment().subtract(i,'months').format('YYYYMM');
      monthlist.push(strmonth);
    }

    var createitem=(item,i)=>{
      if(value==item){
        return (
          <TouchableOpacity key={i} onPress={()=>this.onPressConfirm(item)}
          style={styles.pickeritem}>
            <View style={styles.pickeritemview}>
              <Text style={[styles.pickeritemtext,styles.pickerselitemtext]} allowFontScaling={false}>{item}</Text>
              <Text style={styles.pickerselitemicon} allowFontScaling={false}>
                {icon('dui')}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }else{
        return (
          <TouchableOpacity key={i} onPress={()=>this.onPressConfirm(item)}
          style={styles.pickeritem}>
            <View style={styles.pickeritemview}>
              <Text style={styles.pickeritemtext} allowFontScaling={false}>{item}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    };

    return (
      <TouchableOpacity style={styles.pickertouch}
        underlayColor={'transparent'}
        onPress={this.onPressData}>
        <View style={styles.pickertouchbody}>
          <View>
            <Text style={styles.pickertext} allowFontScaling={false}>{this.getPickerTitle()}</Text>
          </View>
          <Modal transparent={true} visible={this.state.modalVisible}
            onRequestClose={()=>{this.setModalVisible(false);}} >
            <View style={styles.modalview}>
              <View style={styles.navbar}>
                <View style={styles.navback}>
                  <TouchableOpacity onPress={this.onPressCancel}>
                    <Text style={styles.icon} allowFontScaling={false}>
                      {icon('qiehuanqizuo')}取消
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.navtitle}>
                  <Text style={styles.navtitletext}allowFontScaling={false}>月份</Text>
                </View>
              </View>
              <View style={styles.pickercon}>
                <ScrollView style={styles.scrollcontainer} keyboardShouldPersistTaps={true}>
                  {monthlist.map(createitem)}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  }
}