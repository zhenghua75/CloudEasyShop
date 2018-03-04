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
  ListView
} from 'react-native';
import Immutable from 'immutable';
import icon from '../constants/iconfont.js';
import moment from 'moment';

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
import DatePicker from 'react-native-datepicker';
import DeptPicker from '../components/DeptPicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  spinner: {
    justifyContent: 'center',
    paddingTop:2,
    paddingBottom:2
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
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    height:33
  },
  labelinp: {
    fontSize: 16,
    alignSelf: 'center',
    width: 66,
    color: '#000'
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
    top: 5,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
  },
  monthpicker: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginTop: 5,
    marginBottom: 5,
    height: 33
  },
  monthpickeritem: {
    fontSize: 12
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
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 3
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
  },
  lists: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  footerstyle: {
    flex:0,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#EBE4E2'
  },
  emptyrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10
  },
  emptyicon: {
    fontFamily: 'iconfont',
    fontSize: 50,
    color: '#a9a9a9',
    marginTop: 20,
  },
  emptytext: {
    marginTop: 20,
    fontSize: 20
  },
  rowitem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  rowitemview:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:8
  },
  listheader:{
    flexDirection:'row',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
    backgroundColor:'#ffffff'
  },
  listheadertitleview:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:10
  }
});

class ReportCardTop extends Component {
  constructor(props) {
    super(props);
    strtoday=moment().format('YYYY-MM-DD');
    this.state={
      searchbegdate:strtoday,
      searchenddate:strtoday,
      searchdeptid:'',
      dataSource:null,
      curpage: -1,
      statusCode: 'STATUS_LOADING'
    }
    this.cardTopQuery=this.cardTopQuery.bind(this);
    this._curconsdata = [];
    this.renderRow = this.renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.moreConsData = this.moreConsData.bind(this);
  }

  cardTopQuery(){
    const {
      actions,
      auth
    } = this.props;
    if (this.state.searchbegdate == null || this.state.searchbegdate == '') {
      Alert.alert('提示', '请选择开始日期', [{
        text: '确定'
      }]);
    } else if (this.state.searchenddate == null || this.state.searchenddate == '') {
      Alert.alert('提示', '请选择结束日期', [{
        text: '确定'
      }]);
    } else {
      this._curconsdata = [];
      this.setState({
        curpage: 0,
        statusCode: 'STATUS_LOADING'
      });
      this.timer = setTimeout(() => {
        this._onRefresh(0);
      }, 300);
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  moreConsData() {
    const {
      report
    } = this.props;
    if (this.state.statusCode === 'STATUS_NORMAL' && this.state.curpage >= 0 && report.report.recordsFiltered > this._curconsdata.length) {
      this.setState({
        statusCode: 'STATUS_LOADING'
      });
      let newpage = this.state.curpage + 1;
      this.setState({
        curpage: newpage
      });
      this.timer = setTimeout(() => {
        this._onRefresh(newpage);
      }, 300);
    }
  }

  _onRefresh(pageindex) {
    const {
      actions,
      auth,
      report
    } = this.props;
    let reqstart = 0;
    if (pageindex > 0) {
      reqstart = pageindex * 20;
    }
    if (pageindex === 0 || this.state.curpage <= pageindex) {
      if (!report.isFetching) {
        var strbegdate=this.state.searchbegdate;
        var strenddate=this.state.searchenddate;
        var strdeptid=this.state.searchdeptid;
        if(strdeptid==''){
          strdeptid='';
        }else{
          strdeptid="='"+strdeptid+"'";
        }
        var strconsdate="between '"+strbegdate+"' and '"+strenddate+" 23:59:59'";
        let repdata = {
         draw: 1,
          columns: [{
            data: 'tbConsItemOther.SaleCount',
            name: '',
            searchable: true,
            orderable: true,
            search: {
              value: '',
              regex: false
            }
          },{
            data: 'tbConsItemOther.SaleFee',
            name: '',
            searchable: true,
            orderable: true,
            search: {
              value: '',
              regex: false
            }
          },{
            data: 'tbConsItemOther.vcDeptId',
            name: '',
            searchable: true,
            orderable: true,
            search: {
              value: strdeptid,
              regex: false
            }
          },{
            data: 'tbConsItemOther.dtConsDate',
            name: '',
            searchable: true,
            orderable: true,
            search: {
              value: strconsdate,
              regex: false
            }
          }],
          order: [{
            column: 0,
            dir: 'desc'
          }],
          start: reqstart,
          length: 20,
          search: {
            value: '',
            regex: false
          }
        };
        actions.reportCardTop(auth.token.access_token, 'reportCardTop', repdata,auth.info.api);
      }
    }
  }

  componentWillMount() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: ds.cloneWithRows([])
    });
  }

  componentDidMount(){
    const {
      actions,
      auth
    } = this.props;
    let repdata = {
      draw: 1,
      columns: [{
        data: 'tbConsItemOther.vcCardID',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '=0',
          regex: false
        }
      },{
        data: 'tbConsItemOther.vcDeptId',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '=0',
          regex: false
        }
      },{
        data: 'tbConsItemOther.dtConsDate',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: "='1900-01-01'",
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
    actions.reportCardTop(auth.token.access_token, 'reportCardTop', repdata,auth.info.api);
  }

  componentWillReceiveProps(nextProps) {
    let report = nextProps.report;
    if(report.reportType==='reportCardTop'){
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      let map1 = Immutable.fromJS(report.report);
      let map2 = Immutable.fromJS(this.props.report.report);
      if (!Immutable.is(map1, map2) && !report.isFetching) {
        this.setState({
          statusCode: 'STATUS_NORMAL'
        });
      } else if (Immutable.is(map1, map2) && !report.isFetching && report.report && report.report.data.length === 0) {
        this.setState({
          statusCode: 'STATUS_NORMAL'
        });
      }

      if (report.report && report.report.data.length > 0) {
        map1 = Immutable.fromJS(report.report.data);
        map2 = Immutable.fromJS(this.props.report.report.data);
        if (!Immutable.is(map1, map2)) {
          var newdatatmp = report.report.data;
          for (var i = 0; i < newdatatmp.length; i++) {
            this._curconsdata.push(newdatatmp[i]);
          }
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this._curconsdata)
          });
        } else if (this._curconsdata.length === 0) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows([])
          });
        }
      } else if (!report.isFetching && report.report && report.report.data.length == 0) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([{}])
        });
      } else if (this._curconsdata.length === 0) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([])
        });
      }
    }
  }

  renderFooter() {
    const statusCode = this.state.statusCode;
    const {
      report
    } = this.props;
    let footerContext;
    if (statusCode === 'STATUS_NORMAL') {
      if (report.report && report.report.recordsFiltered <= this._curconsdata.length && this._curconsdata.length > 0) {
        footerContext = (
          <View style={styles.footerstyle}>
            <Text style={{color:'#000000',paddingVertical:5}} allowFontScaling={false}>{'已经到底了'}</Text>
          </View>
        );
      } else {
        return null;
      }
    } else if (statusCode === 'STATUS_LOADING') {
      footerContext = (
        <View style={styles.footerstyle}>
          <ActivityIndicator style={styles.spinner} animating={true} size='small' color='#FE8330' />
          <Text style={{color:'#000000',paddingBottom:2}} allowFontScaling={false}>{'加载中...'}</Text>
        </View>
      );
    }

    return footerContext;
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData && rowData.tbConsItemOther) {
      return (
        <View style={styles.rowitem}>
          <View style={styles.rowitemview}>
            <Text style={{fontSize:12}} allowFontScaling={false}>{rowData.tbConsItemOther.vcCardID}</Text>
          </View>
          <View style={styles.rowitemview}>
            <Text style={{fontSize:12}} allowFontScaling={false}>{rowData.tbAssociator.vcAssName}</Text>
          </View>
          <View style={styles.rowitemview}>
            <Text style={{fontSize:12}} allowFontScaling={false}>{rowData.tbConsItemOther.SaleCount}</Text>
          </View>
          <View style={styles.rowitemview}>
            <Text style={{fontSize:12}} allowFontScaling={false}>{rowData.tbConsItemOther.SaleFee}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.emptyrow}>
          <Text style={styles.emptyicon} allowFontScaling={false}>
            {icon('tishi')}
          </Text>
          <Text style={styles.emptytext} allowFontScaling={false}>没有查询到任何数据</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {
      report
    } = this.props;

    let maxwidth = Dimensions.get('window').width;
    let datewidth = maxwidth - 100;

    return (
      <View style={styles.container}>
        <View style={styles.searchmodelview}>
          <View style={styles.inputblock}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              开始日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.searchbegdate} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start',height:25},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate="2000-01-01" maxDate="2100-12-31" showIcon={false}
                onDateChange={(date) => {this.setState({searchbegdate:date})}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblock}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              结束日期
            </Text>
            <View style={styles.inputcontroldiv}>
              <DatePicker style={{width:datewidth}} date={this.state.searchenddate} mode="date" format="YYYY-MM-DD"
                customStyles={{
                  dateTouchBody:{justifyContent:'flex-start',height:25},
                  dateInput:{alignItems:'flex-start',paddingLeft:20,borderWidth:0},
                  dateText:{fontSize:16}
                }}
                minDate="2000-01-01" maxDate="2100-12-31" showIcon={false}
                onDateChange={(date) => {this.setState({searchenddate:date})}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblock}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              门店
            </Text>
            <View style={styles.inputdiv}>
              <DeptPicker
                depts={report.report}
                value={this.state.searchdeptid}
                optionDeptKey="tbConsItemOther.vcDeptId"
                onValueChange={(deptid) => {this.setState({searchdeptid: deptid});}} />
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.searchbtnview}>
            <View style={styles.btnviewchild}>
              <TouchableOpacity style={styles.iconbtn} onPress={this.cardTopQuery}>
                <Text style={styles.iconsearch} allowFontScaling={false}>
                  {icon('sousuo1')}
                </Text>
                <Text style={[styles.icontext,{marginLeft: 5}]} allowFontScaling={false}>查询</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.listheader}>
          <View style={styles.listheadertitleview}>
            <Text allowFontScaling={false}>会员卡号</Text>
          </View>
          <View style={styles.listheadertitleview}>
            <Text allowFontScaling={false}>会员名称</Text>
          </View>
          <View style={styles.listheadertitleview}>
            <Text allowFontScaling={false}>消费次数</Text>
          </View>
          <View style={styles.listheadertitleview}>
            <Text allowFontScaling={false}>消费额</Text>
          </View>
        </View>
        <View style={styles.lists}>
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={ this.renderRow }
            onEndReached={this.moreConsData}
            onEndReachedThreshold={5}
            pageSize={10}
          />
          {this.renderFooter()}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportCardTop);