import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  RecyclerViewBackedScrollView,
  RefreshControl,
  Alert,
  TouchableHighlight
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

import CheckBox from '../components/CheckBox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  tab: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FE8F45'
  },
  tabitem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca'
  },
  tabitemtitle: {
    fontSize: 14,
    padding: 10
  },
  lists: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10
  },
  verticalLine: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: '#cacaca'
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  emptyrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10
  },
  topview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sn: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#000'
  },
  icon: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#FE8F45',
    paddingLeft: 20
  },
  midview: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 1,
  },
  textlarge: {
    fontSize: 16,
  },
  horizontalLine: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ccc',
  },
  bottomview: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10
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
  modallay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalinner: {
    borderRadius: 2,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    margin: 22
  },
  inputdiv: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  modalitem: {
    fontSize: 16,
    padding: 10,
    color: 'black'
  },
  modalopaplace: {
    flex: 1
  },
  inputblocktop: {
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
    fontSize: 16,
    color:'gray'
  },
  buttonblock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FE8F45',
    padding: 8,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  detailtext: {
    fontSize: 14,
    color: '#000000'
  }
});

var CheckBoxData = [];

class MakeupVouchAdd extends Component {
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
      vouchdate: strday,
      submitdisable:false
    }
    this.renderRow = this.renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.submitAddVouchAndVouchs = this.submitAddVouchAndVouchs.bind(this);
  }

  submitAddVouchAndVouchs() {
    const {
      actions,
      auth,
      profile,
      vouch
    } = this.props;
    this.setState({submitdisable:true});
    let strmvids = '';
    let arrmvids = [];
    for (var i = 0; i < CheckBoxData.length; i++) {
      if (CheckBoxData[i].state.checked) {
        strmvids += CheckBoxData[i].props.value.replace('row_', '') + ',';
        arrmvids.push(CheckBoxData[i].props.value.replace('row_', ''));
      }
    }
    if (profile.user.whId == null || profile.user.whId == '') {
      Alert.alert('提示', '用户不属于任何仓库，请联系系统管理员配置用户所属仓库', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else if (strmvids == '') {
      Alert.alert('提示', '请选择关联叫货单', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else {
      strmvids = "'" + strmvids.substr(0, strmvids.length - 1) + "'";
      let vouchData = {
        action: 'create',
        data: [{
          Vouch: {
            VouchType: '014',
            ToWhId: profile.user.whId,
            VouchDate: this.state.vouchdate,
            Memo: strmvids
          }
        }]
      };

      let vouchsData = {
        action: 'create',
        data: []
      };
      for (var i = 0; i < vouch.vouchs.data.length; i++) {
        var tmprowid = vouch.vouchs.data[i].Vouchs.VouchId.toString();
        if (arrmvids.includes(tmprowid)) {
          var flag = false;
          for (var j = 0; j < vouchsData.data.length; j++) {
            if (vouchsData.data[j].Vouchs.InvId == vouch.vouchs.data[i].Vouchs.InvId) {
              flag = true;
              vouchsData.data[j].Vouchs.Num = vouchsData.data[j].Vouchs.Num + vouch.vouchs.data[i].Vouchs.Num;
              break;
            }
          }
          if (!flag) {
            vouchsData.data.push({
              Vouchs: {
                InvId: vouch.vouchs.data[i].Vouchs.InvId,
                Num: vouch.vouchs.data[i].Vouchs.Num,
                VouchId: 0
              }
            });
          }
        }
      }
      actions.vouchAndVouchs(auth.token.access_token, '014', vouchData, vouchsData,auth.info.api)
        .then(()=>{this.setState({submitdisable:false})});
      this.timer = setTimeout(() => {
        actions.getVouch(auth.token.access_token, {
          VouchType: '014',
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
    this._onRefresh();
  }

  componentWillReceiveProps(nextProps) {
    const {
      actions,
      auth
    } = this.props;
    if (nextProps.myVouch['012000'].vouch && nextProps.myVouch['012000'].vouch.data && nextProps.myVouch['012000'].vouch.data.length > 0) {
      isupdate = false;
      var map1 = Immutable.fromJS(nextProps.myVouch['012000']);
      var map2 = Immutable.fromJS(this.props.myVouch['012000']);
      if (Immutable.is(map1, map2)) {
        isupdate = false;
      } else {
        isupdate = true;
      }
      if (isupdate) {
        let strmvids = '';
        for (var i = 0; i < nextProps.myVouch['012000'].vouch.data.length; i++) {
          var vouchidtmp = nextProps.myVouch['012000'].vouch.data[i].DT_RowId.replace('row_', '');
          strmvids += vouchidtmp + ',';
        }
        strmvids = strmvids.substr(0, strmvids.length - 1);
        let datavouchs = {
          draw: 1,
          columns: [{
            data: 'Vouchs.VouchId',
            name: '',
            searchable: true,
            orderable: true,
            search: {
              value: ' in(' + strmvids + ')',
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
        actions.vouchs(auth.token.access_token, datavouchs,auth.info.api);
      }
    }
  }

  _onRefresh() {
    this.timer = setTimeout(() => {
      const {
        actions,
        auth,
        profile
      } = this.props;
      let reqdata = {
        draw: 1,
        columns: [{
          data: 'Vouch.FromWhId',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=' + profile.user.whId,
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
      actions.getCallVouch(auth.token.access_token, reqdata,auth.info.api);
    }, 500);
  }

  initCheckBoxData(checkbox) {
    if (checkbox != null) {
      isexist = false;
      for (var i = 0; i < CheckBoxData.length; i++) {
        if (CheckBoxData[i].props.value == checkbox.props.value) {
          isexist = true;
          break;
        }
      }
      if (!isexist) {
        CheckBoxData.push(checkbox);
      }
    }
  }

  checkSelect(checked, id) {
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData && rowData.DT_RowId) {
      return (
        <View style={[styles.row]}>
          <View style={styles.topview}>
            <CheckBox
             ref={(c)=>this.initCheckBoxData(c)}
             label=""
             checked={false}
             value={rowData.DT_RowId}
             onChange={(checked) => this.checkSelect(checked,rowID)} />
            <Text style={styles.sn} allowFontScaling={false}>{rowData.Vouch.Code}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.midview}>
            <Text style={styles.detailtext} allowFontScaling={false}>叫货仓：{rowData.Warehouse.Name}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>制单人：{rowData.Users.FullName}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.bottomview}>
            <Text style={styles.detailtext} allowFontScaling={false}>{rowData.Vouch.MakeTime}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.emptyrow}>
          <Text style={styles.emptyicon} allowFontScaling={false}>
            {icon('tishi')}
          </Text>
          <Text style={styles.emptytext} allowFontScaling={false}>暂无相关单据</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {
      actions,
      auth,
      profile,
      myVouch
    } = this.props;
    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let dataSource = ds.cloneWithRows([]);
    if (myVouch['012000'].vouch && myVouch['012000'].vouch.data && myVouch['012000'].vouch.data.length > 0) {
      dataSource = ds.cloneWithRows(myVouch['012000'].vouch.data);
    } else if (myVouch['012000'].vouch) {
      dataSource = ds.cloneWithRows([{}]);
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputblocktop}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            生产仓库
          </Text>
          <View style={styles.inputdiv}>
            <Text style={styles.textinfo} allowFontScaling={false}>{profile.user.whName}</Text>
          </View>
        </View>
        <View style={styles.lists}>
          <ListView
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={ this.renderRow }
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            initialListSize={5}
            pageSize={5}
            refreshControl={
              <RefreshControl
                refreshing={myVouch['012000'].isFetching}
                onRefresh = {
                  this._onRefresh
                }
                tintColor="#7BBFEA"
                title="加载中..."
                titleColor="#7BBFEA"
                colors={['#FE8F45', '#FFA500', '#8B00FF']}
                progressBackgroundColor="#F5F4F4" />
            }
          />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeupVouchAdd);