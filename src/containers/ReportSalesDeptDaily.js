import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Picker,
  ScrollView,
  Animated
} from 'react-native';

import icon from '../constants/iconfont.js';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

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
    backgroundColor: '#F5F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  searchmodelview:{
    flex:0,
    backgroundColor:'#ffffff',
    borderBottomWidth:0.5,
    borderColor:'#cacaca',
    paddingBottom:5
  },
  inputblock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5
  },
  labelinp: {
    fontSize: 16,
    alignSelf: 'center',
    width: 66,
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputdiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  inputcontroldiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
  },
  baritem: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  barlabel: {
    color: '#000000',
    flex: 1,
    fontSize: 12,
    paddingTop:10,
    paddingBottom:2
  },
  bardata: {
    flex: 2,
    flexDirection: 'row'
  },
  bardataNumber: {
    color: '#000000',
    fontSize: 14,
    paddingTop:10
  },
  barbar: {
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  barpoints: {
    backgroundColor: '#F55443'
  },
  scoll: {
    flex: 1,
  },
  sumview:{
    flex:0,
    alignItems:'flex-end',
    padding:10
  },
  sumtext:{
    fontSize:16,
    color:'#000000'
  },
  avgtext:{
    fontSize:14,
    color:'#000000'
  }
});

class ReportSalesDeptDaily extends Component {
  constructor(props) {
    super(props);
    var strday=this.props.month.substr(0,4)+'-'+this.props.month.substr(4,2)+'-01';
    const data = this.props.dailydata[strday];
    const width = this.getWidth(data);
    var deptstate={};
    for(var i in this.props.deptsid){
      deptstate[this.props.deptsid[i]]=new Animated.Value(width[this.props.deptsid[i]]);
    }
    this.state=Object.assign({}, deptstate, {
        curday: strday
    });
  }

  getWidth(data) {
    const {deptsid} = this.props;
    const deviceWidth = Dimensions.get('window').width;
    const maxwidth = deviceWidth-20;
    const unitwidth=Math.floor(maxwidth/60);

    let width = {};
    let widthCap;
    if(data){
      const unitfee=Math.floor(data[deptsid[0]]/60);
      deptsid.forEach(item => {
        if(data[item]){
          widthCap=Math.floor(data[item]/unitfee)*unitwidth;
          if(widthCap>maxwidth){
            widthCap=maxwidth;
          }
          if(widthCap==0){
            widthCap=0.5;
          }
        }else{
          widthCap=0.5;
        }
        width[item] =  widthCap;
      });
    }else{
      widthCap=0.5;
      deptsid.forEach(item => {
        width[item] =  widthCap;
      });
    }

    return width;
  }

  dateChange(day) {
    this.handleAnimation(day);
  }

  handleAnimation(index) {
    const {dailydata,deptsid} = this.props;
    const width = this.getWidth(dailydata[index]);
    const timing = Animated.timing;
    Animated.parallel(deptsid.map(item => {
      return timing(this.state[item], {toValue: width[item]});
    })).start();

    this.setState({
      curday: index
    });
  }

  render() {
    const {
      deptsname,
      deptsid,
      dailydata
    } = this.props;
    const data = dailydata[this.state.curday];

    let maxwidth = Dimensions.get('window').width;
    let datewidth = maxwidth - 100;
    let mindatepick=this.props.month.substr(0,4)+'-'+this.props.month.substr(4,2)+'-01';
    let maxdatepick=moment(mindatepick).add(1,'months').subtract(1,'days').format('YYYY-MM-DD');

    let avgsalefee=0;
    let sumallsalefee=0;
    if(data){
      for(var i in deptsid){
        if(data[deptsid[i]]){
          sumallsalefee+=parseFloat(data[deptsid[i]]);
        }
      }
    }

    if(sumallsalefee>0){
      avgsalefee=sumallsalefee/deptsid.length;
    }

    let scrollbar=[];
    if(deptsid){
      for(var did in deptsid){
        if(data){
          var salefee=0;
          if(data[deptsid[did]]){
            salefee=parseFloat(data[deptsid[did]]);
          }
          if(salefee>=avgsalefee){
            scrollbar.push(
              <View key={did} style={styles.baritem}>
                <View style={styles.bardata}>
                  <Text style={styles.barlabel} allowFontScaling={false}>{deptsname[deptsid[did]]}</Text>
                  <Text style={styles.bardataNumber} allowFontScaling={false}>{salefee.toFixed(2)}</Text>
                </View>
                <Animated.View style={[styles.barbar, styles.barpoints, {width: this.state[deptsid[did]],backgroundColor:'#99CC66'}]} />
              </View>
            );
          }else{
            scrollbar.push(
              <View key={did} style={styles.baritem}>
                <View style={styles.bardata}>
                  <Text style={styles.barlabel} allowFontScaling={false}>{deptsname[deptsid[did]]}</Text>
                  <Text style={styles.bardataNumber} allowFontScaling={false}>{salefee.toFixed(2)}</Text>
                </View>
                <Animated.View style={[styles.barbar, styles.barpoints, {width: this.state[deptsid[did]]}]} />
              </View>
            );
          }
        }else{
          scrollbar.push(
            <View key={did} style={styles.baritem}>
              <View style={styles.bardata}>
                <Text style={styles.barlabel} allowFontScaling={false}>{deptsname[deptsid[did]]}</Text>
                <Text style={styles.bardataNumber} allowFontScaling={false}>0.00</Text>
              </View>
              <Animated.View style={[styles.barbar, styles.barpoints, {width: this.state[deptsid[did]]}]} />
            </View>
          );
        }
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchmodelview}>
          <View style={styles.inputblock}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              当前日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.curday} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start'},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate={mindatepick} maxDate={maxdatepick} showIcon={false}
                onDateChange={(date) => {this.dateChange(date)}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.sumview}>
          <Text style={styles.sumtext} allowFontScaling={false}>合计：{sumallsalefee.toFixed(2)}</Text>
          <Text style={styles.avgtext} allowFontScaling={false}>均值：{avgsalefee.toFixed(2)}</Text>
        </View>
        <ScrollView style={styles.scoll}>
          {scrollbar}
        </ScrollView>
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportSalesDeptDaily);