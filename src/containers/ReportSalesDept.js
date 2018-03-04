import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Dimensions,
  Picker,
  Alert,
  ScrollView,
  Animated
} from 'react-native';

import icon from '../constants/iconfont.js';
import moment from 'moment';
import MonthPicker from '../components/MonthPicker';

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
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  searchmodelview:{
    flex:0,
    backgroundColor:'#ffffff',
    borderBottomWidth:0.5,
    borderColor:'#cacaca',
    paddingBottom:5
  },
  inputblock: {
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
    width: 60,
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
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
  },
  iconsearch: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#FE8F45'
  },
  iconbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'flex-end',
    borderColor: '#FE8F45',
    borderWidth: 0.5,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  iconbtnleft: {
    justifyContent:'center',
    alignItems: 'center',
    alignSelf:'flex-start',
    borderColor: '#FE8F45',
    borderWidth: 0.5,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  icontext: {
    fontSize: 14,
    color: '#000000'
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
  },
  searchbtnview:{
    flexDirection:'row',
    paddingHorizontal:10
  },
  btnviewchild:{
    flex:1
  }
});

class ReportSalesDept extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchmonth:''
    }
    this.salesQuery=this.salesQuery.bind(this);
    this.daysale=this.daysale.bind(this);
  }

  salesQuery(){
    const {
      actions,
      auth
    } = this.props;
    if (this.state.searchmonth == null || this.state.searchmonth == '') {
      Alert.alert('提示', '请选择月份', [{
        text: '确定'
      }]);
    } else {
      var stryear=this.state.searchmonth.substr(0,4);
      var strmonth=this.state.searchmonth.substr(4,2);
      let repdata = {
        draw: 1,
        columns: [{
          data: 'tbConsItemOther.vcDeptId',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '',
            regex: false
          }
        },{
          data: 'tbConsItemOther.year',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: stryear,
            regex: false
          }
        },{
          data: 'tbConsItemOther.month',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: strmonth,
            regex: false
          }
        },{
          data: 'tbConsItemOther.day',
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
        }],
        start: 0,
        length: -1,
        search: {
          value: '',
          regex: false
        }
      };
      actions.reportSalesChart(auth.token.access_token, 'reportSalesDept', repdata,auth.info.api);
    }
  }

  daysale(everydaydata,deptsname,deptsid){
    var keystmp=Object.keys(everydaydata);
    if(keystmp.length>0){
      var daytmp=keystmp[0];
      var monthtmp=daytmp.substr(0,4)+daytmp.substr(5,2);
      if(monthtmp!==this.state.searchmonth){
        var strmsg='请先点击查询'+this.state.searchmonth+'数据，再查看按天数据';
        Alert.alert('提示', strmsg, [{
          text: '确定'
        }]);
      }else{
        Actions.ReportSalesDeptDaily({
          dailydata:everydaydata,
          deptsname:deptsname,
          deptsid:deptsid,
          month:this.state.searchmonth});
      }
    }else{
      Alert.alert('提示', '本月没有按天查看的数据', [{
        text: '确定'
      }]);
    }
  }

  componentDidMount(){
    const {
      actions,
      auth
    } = this.props;
    let repdata = {
      draw: 1,
      columns: [{
        data: 'tbConsItemOther.vcDeptId',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '=0',
          regex: false
        }
      },{
        data: 'tbConsItemOther.year',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '1900',
          regex: false
        }
      },{
        data: 'tbConsItemOther.month',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '01',
          regex: false
        }
      },{
        data: 'tbConsItemOther.day',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '',
          regex: false
        }
      }],
      order: [{
        column: 3,
        dir: 'asc'
      }],
      start: 0,
      length: -1,
      search: {
        value: '',
        regex: false
      }
    };
    actions.reportSalesChart(auth.token.access_token, 'reportSalesDept', repdata,auth.info.api)
  }

  render() {
    const {
      report
    } = this.props;

    let maxwidth = Dimensions.get('window').width;
    let datewidth = maxwidth - 100;

    let everydaydata={};
    let sumdeptdata=[];
    let sumallsalefee=0;
    if(report.report && report.reportType==='reportSalesDept' && report.report.data && report.report.data.length>0){
      var resdata=report.report.data;
      for(var d in resdata){
        sumallsalefee+=parseFloat(resdata[d].tbConsItemOther.SaleFee);
        var keyday=resdata[d].tbConsItemOther.year;
        if(resdata[d].tbConsItemOther.month<10){
          keyday+='-0'+resdata[d].tbConsItemOther.month;
        }else{
          keyday+='-'+resdata[d].tbConsItemOther.month;
        }
        if(resdata[d].tbConsItemOther.day<10){
          keyday+='-0'+resdata[d].tbConsItemOther.day;
        }else{
          keyday+='-'+resdata[d].tbConsItemOther.day;
        }
        if(everydaydata[keyday]){
          everydaydata[keyday][resdata[d].tbConsItemOther.vcDeptId]=resdata[d].tbConsItemOther.SaleFee;
        }else{
          everydaydata[keyday]={};
          everydaydata[keyday][resdata[d].tbConsItemOther.vcDeptId]=resdata[d].tbConsItemOther.SaleFee;
        }

        if(sumdeptdata.length>0){
          var deptindex=-1;
          for(var s in sumdeptdata){
            if(sumdeptdata[s].deptid==resdata[d].tbConsItemOther.vcDeptId){
              deptindex=s;
              break;
            }
          }
          if(deptindex===-1){
            sumdeptdata.push({
              deptid:resdata[d].tbConsItemOther.vcDeptId,
              deptname:resdata[d].Depts.Name,
              salefee:parseFloat(resdata[d].tbConsItemOther.SaleFee)
            });
          }else{
            sumdeptdata[deptindex].salefee+=parseFloat(resdata[d].tbConsItemOther.SaleFee);
          }
        }else{
          sumdeptdata.push({
            deptid:resdata[d].tbConsItemOther.vcDeptId,
            deptname:resdata[d].Depts.Name,
            salefee:parseFloat(resdata[d].tbConsItemOther.SaleFee)
          });
        }
      }
    }

    let sortsumdeptdata=[];
    if(sumdeptdata.length>0){
      sortsumdeptdata.push(sumdeptdata[0]);
      for(var tt=1;tt<sumdeptdata.length;tt++){
        var insertindex=-1;
        for(var ti in sortsumdeptdata){
          if(parseFloat(sumdeptdata[tt].salefee)>parseFloat(sortsumdeptdata[ti].salefee)){
            insertindex=ti;
            break;
          }
        }
        if(insertindex===-1){
          sortsumdeptdata.push(sumdeptdata[tt]);
        }else{
          sortsumdeptdata.splice(insertindex,0,sumdeptdata[tt]);
        }
      }
    }
    let deptsname={};
    let deptsid=[];
    for(var dti in sortsumdeptdata){
      deptsname[sortsumdeptdata[dti].deptid]=sortsumdeptdata[dti].deptname;
      deptsid.push(sortsumdeptdata[dti].deptid);
    }

    let avgsalefee=0;
    if(sumallsalefee>0){
      avgsalefee=sumallsalefee/sortsumdeptdata.length;
    }
    let scrollbar=[];
    if(sortsumdeptdata.length>0){
      let unitwidth=Math.floor((maxwidth-20)/60);
      let unitfee=Math.floor(sortsumdeptdata[0].salefee/60);
      for(var ssd in sortsumdeptdata){
        let barwidth=Math.floor(sortsumdeptdata[ssd].salefee/unitfee)*unitwidth;
        if(barwidth>(maxwidth-20)){
          barwidth=maxwidth-20;
        }
        if(barwidth==0){
          barwidth=0.5;
        }
        //let barwidthanim=new Animated.Value(barwidth);
        if(sortsumdeptdata[ssd].salefee>=avgsalefee){
          scrollbar.push(
            <View key={ssd} style={styles.baritem}>
              <View style={styles.bardata}>
                <Text style={styles.barlabel} allowFontScaling={false}>{sortsumdeptdata[ssd].deptname}</Text>
                <Text style={styles.bardataNumber} allowFontScaling={false}>{sortsumdeptdata[ssd].salefee.toFixed(2)}</Text>
              </View>
              <Animated.View style={[styles.barbar, styles.barpoints, {width: barwidth,backgroundColor:'#99CC66'}]} />
            </View>
          );
        }else{
          scrollbar.push(
            <View key={ssd} style={styles.baritem}>
              <View style={styles.bardata}>
                <Text style={styles.barlabel} allowFontScaling={false}>{sortsumdeptdata[ssd].deptname}</Text>
                <Text style={styles.bardataNumber} allowFontScaling={false}>{sortsumdeptdata[ssd].salefee.toFixed(2)}</Text>
              </View>
              <Animated.View style={[styles.barbar, styles.barpoints, {width: barwidth}]} />
            </View>
          );
        }
      }
    }

    return (
      <View style={styles.container}>
        <Modal visible={report.isFetching}
          onRequestClose={()=>{return false;}} transparent={true}>
          <ActivityIndicator style={styles.spinner} animating={report.isFetching} size='large' color='#FE8F45' />
        </Modal>
        <View style={styles.searchmodelview}>
          <View style={styles.inputblock}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              月份
            </Text>
            <View style={styles.inputdiv}>
              <MonthPicker
                value={this.state.searchmonth}
                onValueChange={(month) => {this.setState({searchmonth: month});}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.searchbtnview}>
            <View style={styles.btnviewchild}>
              <TouchableOpacity style={styles.iconbtnleft}
                onPress={()=>{this.daysale(everydaydata,deptsname,deptsid)}}>
                <Text style={styles.icontext} allowFontScaling={false}>按天</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnviewchild}>
              <TouchableOpacity style={styles.iconbtn} onPress={this.salesQuery}>
                <Text style={styles.iconsearch} allowFontScaling={false}>
                  {icon('sousuo1')}
                </Text>
                <Text style={[styles.icontext,{marginLeft: 5}]} allowFontScaling={false}>查询</Text>
              </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportSalesDept);