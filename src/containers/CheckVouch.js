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
  Modal,
  ActivityIndicator
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
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tab: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FE8F45',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10
  },
  tabitem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ffffff'
  },
  tabitemtitle: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  lists: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
    borderWidth: 0.5,
    borderColor: '#cacaca',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
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
    paddingVertical: 10,
    backgroundColor: '#F0F0F0'
  },
  sn: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: '#000000'
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#FE8F45',
    paddingRight: 5,
  },
  iconbtn: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FE8F45',
    borderWidth: 0.5,
    borderRadius: 14,
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  icontext: {
    fontSize: 12,
    color: '#000000'
  },
  midview: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  horizontalLine: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff'
  },
  bottomview: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 10
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
  detailtext: {
    fontSize: 14,
    color: '#000000'
  }
});

class CheckVouch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabselected: '1',
      spinnershow:false
    };
    this.renderRow = this.renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.delVouch = this.delVouch.bind(this);
  }

  delVouch(delvid, delcode) {
    if (delvid === '' || delvid === '0' || delcode === '' || delcode === '0') {
      Alert.alert('错误提示', '未选中任何盘点单', [{
        text: '确定'
      }]);
    } else {
      const {
        actions,
        auth
      } = this.props;
      let alertmsg = '是否确认要删除盘点单：\n' + delcode;
      Alert.alert('请确认', alertmsg, [{
        text: '取消',
        onPress: 
          () => {
            //console.log('cancel!');
        }
      }, {
        text: '确认',
        onPress: () => {
          let rowId = 'row_' + delvid;
          let data = {
            action: 'remove',
            data: {}
          };
          data.data[rowId] = {
            DT_RowId: rowId,
            Vouch: {
              VouchType: '010'
            }
          };
          this.setState({spinnershow:true});
          actions.vouch(auth.token.access_token, '010', data,auth.info.api)
            .then(()=>{this.setState({spinnershow:false});this._onRefresh();});
        }
      }]);
    }
  }

  componentDidMount() {
    this._onRefresh();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    isupdate = false;
    var map1 = Immutable.fromJS(nextProps.myVouch['010']);
    var map2 = Immutable.fromJS(this.props.myVouch['010']);
    if (Immutable.is(map1, map2)) {
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
    if (nextState.tabselected !== this.state.tabselected) {
      this._onRefresh();
    }
    return isupdate;
  }

  _onRefresh() {
    this.timer = setTimeout(() => {
      const {
        actions,
        auth
      } = this.props;
      if (this.state.tabselected === '1') {
        actions.getVouch(auth.token.access_token, {
          VouchType: '010',
          IsVerify: false,
          VouchDate: ''
        },auth.info.api);
      } else {
        actions.getVouch(auth.token.access_token, {
          VouchType: '010',
          IsVerify: true,
          VouchDate: ''
        },auth.info.api);
      }
    }, 500);
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData && rowData.Sn) {
      if (this.state.tabselected === '1' && rowData.IsVerify === false) {
        return (
          <TouchableOpacity style={[styles.row]} onPress={()=>{Actions.ReadCheckVouch({vouchId:rowData.Id,vouchType:'010',isVerify:false})}}>
          <View style={styles.topview}>
            <Text style={styles.sn} allowFontScaling={false}>{rowData.Code}</Text>
            <TouchableOpacity style={styles.iconbtn} onPress={()=>this.delVouch(rowData.Id,rowData.Code)}>
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('shanchu')}
              </Text>
              <Text style={styles.icontext} allowFontScaling={false}>删除</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine}/>
          <View style={styles.midview}>
            <Text style={styles.detailtext} allowFontScaling={false}>仓库：{rowData.ToWhName}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>盘点人：{rowData.FullName}</Text>
          </View>
          <View style={styles.bottomview}>
            <Text style={styles.detailtext} allowFontScaling={false}>{rowData.MakeTime}</Text>
          </View>
        </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={[styles.row]} onPress={()=>{Actions.ReadCheckVouch({vouchId:rowData.Id,vouchType:'010',isVerify:true})}}>
          <View style={styles.topview}>
            <Text style={styles.sn} allowFontScaling={false}>{rowData.Code}</Text>
          </View>
          <View style={styles.horizontalLine}/>
          <View style={styles.midview}>
            <Text style={styles.detailtext} allowFontScaling={false}>仓库：{rowData.ToWhName}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>盘点人：{rowData.FullName}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>盘点审核人：{rowData.VerifyFullName}</Text>
          </View>
          <View style={styles.bottomview}>
            <Text style={styles.detailtext} allowFontScaling={false}>{rowData.MakeTime}</Text>
          </View>
        </TouchableOpacity>
        );
      }
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
      myVouch
    } = this.props;
    var tab1selectstyle = {
      color: this.state.tabselected === '1' ? '#FE8F45' : '#ffffff',
    };
    var tab2selectstyle = {
      color: this.state.tabselected === '2' ? '#FE8F45' : '#ffffff',
    };
    var tab1border = {
      backgroundColor: this.state.tabselected === '1' ? '#ffffff' : '#FE8F45',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    };
    var tab2border = {
      backgroundColor: this.state.tabselected === '2' ? '#ffffff' : '#FE8F45',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5
    };

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let dataSource = ds.cloneWithRows([]);
    if(myVouch && myVouch['010']){
      if (myVouch['010'].vouch && myVouch['010'].vouch.length > 0) {
        dataSource = ds.cloneWithRows(myVouch['010'].vouch);
      } else if (myVouch['010'].vouch) {
        dataSource = ds.cloneWithRows([{}]);
      }
    }
    return (
      <View style={styles.container}>
        <Modal visible={this.state.spinnershow}
          onRequestClose={()=>{return false;}} transparent={true} >
          <ActivityIndicator style={styles.spinner} animating={this.state.spinnershow} size='large' color='#FE8F45' />
        </Modal>
        <View style={styles.tab}>
          <TouchableOpacity style={[styles.tabitem,tab1border]} 
              onPress={()=>{this.setState({tabselected:'1'});}}
          >
            <Text style={[styles.tabitemtitle,tab1selectstyle]} allowFontScaling={false}>未审核</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabitem,tab2border]}
              onPress={()=>{this.setState({tabselected:'2'});}}
          >
            <Text style={[styles.tabitemtitle,tab2selectstyle]} allowFontScaling={false}>已审核</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lists}>
          <ListView
              dataSource={dataSource}
              enableEmptySections={true}
              renderRow={this.renderRow}
              renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
              initialListSize={5}
              pageSize={5}
              refreshControl={
              <RefreshControl
                  refreshing={myVouch['010'].isFetching}
                  onRefresh = {
                    this._onRefresh
                  }
                  tintColor="#7BBFEA"
                  title="加载中..."
                  titleColor="#7BBFEA"
                  colors={['#FE8F45', '#FFA500', '#8B00FF']}
                  progressBackgroundColor="#F5F4F4" 
              />
            }
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckVouch);