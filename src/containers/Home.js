import React, {
  Component,
  PropTypes
}
from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator
}
from 'react-native';

import icon from '../constants/iconfont.js';
import {
  connect
}
from 'react-redux';
import {
  bindActionCreators
}
from 'redux';
import * as actions from '../actions';
import {
  Actions
}
from 'react-native-router-flux';
import Immutable from 'immutable';
import _ from 'underscore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  userinfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#220A00',
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 10
  },
  funcbutton: {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#E4E4E4',
    paddingLeft: 10,
    paddingRight: 20,
    height: 48
  },
  username: {
    fontSize: 16,
    color: '#ffffff',
    paddingLeft: 20,
    paddingBottom: 5
  },
  whname: {
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 38,
  },
  infoname: {
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 20,
    paddingBottom: 3
  },
  funcText: {
    flex:1,
    fontSize: 16,
    color: 'black',
    paddingLeft:10
  },
  iconfunc: {
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#FE8F45'
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#CECECE'
  },
  pendingrow: {
    flexDirection: 'row',
    backgroundColor: '#FE8F45',
  },
  pengingbtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5
  },
  pengingbtnnum: {
    fontSize: 18,
    color: '#370F00',
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 38,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8
  },
  pengingbtndes: {
    fontSize: 14,
    paddingTop: 4,
    color: '#ffffff'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      auth,
      actions
    } = this.props;
    this.timer = setTimeout(() => {
      actions.getProfile(auth.token.access_token, auth.info.api)
        .then(() => {
          if (this.props.profile.user) {
            actions.getUserFuncs(auth.token.access_token, auth.info.api);
            actions.getWhList(auth.token.access_token, auth.info.api);
            actions.getPendingVouch(auth.token.access_token, auth.info.api);
          }
        });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    isupdate = false;
    var map1 = Immutable.fromJS(nextProps.profile);
    var map2 = Immutable.fromJS(this.props.profile);
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
    if (!isupdate) {
      map1 = Immutable.fromJS(nextProps.myVouch['pendingnum'].vouch);
      map2 = Immutable.fromJS(this.props.myVouch['pendingnum'].vouch);
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
      profile,
      myVouch,
      auth
    } = this.props;
    let fullname = '操作员姓名';
    let whname = '';
    let deptname = '';

    if (profile.user && profile.user.fullName) {
      fullname = profile.user.fullName;
      whname = profile.user.whName;
      deptname = profile.user.deptName;
    }

    let pendingnum = {
      callNum: '0',
      readyNum: '0',
      sendNum: '0',
      receiveNum: '0'
    }
    if (myVouch['pendingnum'] && myVouch['pendingnum'].vouch) {
      pendingnum.callNum = myVouch['pendingnum'].vouch.callNum;
      pendingnum.readyNum = myVouch['pendingnum'].vouch.readyNum;
      pendingnum.sendNum = myVouch['pendingnum'].vouch.sendNum;
      pendingnum.receiveNum = myVouch['pendingnum'].vouch.receiveNum;
      if (pendingnum.callNum > 99) {
        pendingnum.callNum = '99+';
      }
      if (pendingnum.readyNum > 99) {
        pendingnum.readyNum = '99+';
      }
      if (pendingnum.sendNum > 99) {
        pendingnum.sendNum = '99+';
      }
      if (pendingnum.receiveNum > 99) {
        pendingnum.receiveNum = '99+';
      }
    }

    let otherfuncs = [];
    if (profile.userfuncs && profile.userfuncs.length > 0) {
      for (var i in profile.userfuncs) {
        if (profile.userfuncs[i].FuncType === 0 && profile.userfuncs[i].Name === 'StockManageCheckVouch') {
          otherfuncs.push(
            <TouchableOpacity key={otherfuncs.length} style={styles.funcbutton} onPress={()=>{Actions.CheckVouch();}}>
              <Text style={styles.iconfunc} allowFontScaling={false}>
                {icon('kucunguanli')}
              </Text>
              <Text style={styles.funcText} allowFontScaling={false}>库存盘点单</Text>
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </TouchableOpacity>
          );
        }
        if (profile.userfuncs[i].FuncType === 0 && profile.userfuncs[i].Name === 'StockManageDeptCheckVouch') {
          otherfuncs.push(
            <TouchableOpacity key={otherfuncs.length} style={styles.funcbutton} onPress={()=>{Actions.DeptCheckVouch();}}>
              <Text style={styles.iconfunc} allowFontScaling={false}>
                {icon('guanli')}
              </Text>
              <Text style={styles.funcText} allowFontScaling={false}>门店盘点单</Text>
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </TouchableOpacity>
          );
        }
        if (profile.userfuncs[i].FuncType === 0 && profile.userfuncs[i].Name === 'ReportSalesChart') {
          otherfuncs.push(
            <TouchableOpacity key={otherfuncs.length} style={styles.funcbutton} onPress={()=>{Actions.ReportSalesDept();}}>
              <Text style={styles.iconfunc} allowFontScaling={false}>
                {icon('jiesuanguanli')}
              </Text>
              <Text style={styles.funcText} allowFontScaling={false}>销售额统计</Text>
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </TouchableOpacity>
          );
        }
        if (profile.userfuncs[i].FuncType === 0 && profile.userfuncs[i].Name === 'ReportCardTopQuery') {
          otherfuncs.push(
            <TouchableOpacity key={otherfuncs.length} style={styles.funcbutton} onPress={()=>{Actions.ReportCardTop();}}>
              <Text style={styles.iconfunc} allowFontScaling={false}>
                {icon('huiyuan')}
              </Text>
              <Text style={styles.funcText} allowFontScaling={false}>会员消费排行榜</Text>
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </TouchableOpacity>
          );
        }
      }
    }

    return (
      <ScrollView style={styles.container}>
        <Modal visible={profile.isFetching}
          onRequestClose={()=>{return false;}} transparent={true} >
          <ActivityIndicator style={styles.spinner} animating={profile.isFetching} size='large' color='#FE8F45' />
        </Modal>
        <TouchableOpacity style={styles.userinfo} activeOpacity={1} onPress={()=>{Actions.SettingHome();}}>
          <Image style={{width:60,height:60}} source={require('../images/logo.png')} />
          <View>
            <Text style={styles.infoname} allowFontScaling={false}>{auth.info.name}</Text>
            <Text style={styles.username} allowFontScaling={false}>{fullname}</Text>
            <Text style={styles.whname} allowFontScaling={false}>{deptname}</Text>
            <Text style={styles.whname} allowFontScaling={false}>{whname}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.pendingrow}>
          <TouchableOpacity style={styles.pengingbtn} onPress={()=>{Actions.CallVouch()}}>
            <Text style={styles.pengingbtnnum} allowFontScaling={false}>{pendingnum.callNum}</Text>
            <Text style={styles.pengingbtndes} allowFontScaling={false}>待叫货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pengingbtn} onPress={()=>{Actions.ReadyVouchRoot()}}>
            <Text style={styles.pengingbtnnum} allowFontScaling={false}>{pendingnum.readyNum}</Text>
            <Text style={styles.pengingbtndes} allowFontScaling={false}>待备货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pengingbtn} onPress={()=>{Actions.SendVouch()}}>
            <Text style={styles.pengingbtnnum} allowFontScaling={false}>{pendingnum.sendNum}</Text>
            <Text style={styles.pengingbtndes} allowFontScaling={false}>待发货</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pengingbtn,{borderRightWidth:0}]} onPress={()=>{Actions.ReceiveVouch()}}>
            <Text style={styles.pengingbtnnum} allowFontScaling={false}>{pendingnum.receiveNum}</Text>
            <Text style={styles.pengingbtndes} allowFontScaling={false}>待收货</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.funcbutton} onPress={()=>{Actions.ReportCurrentStock();}}>
          <Text style={styles.iconfunc} allowFontScaling={false}>
            {icon('jifen')}
          </Text>
          <Text style={styles.funcText} allowFontScaling={false}>库存现存量</Text>
          <Text style={styles.icon} allowFontScaling={false}>
            {icon('qiehuanqiyou')}
          </Text>
        </TouchableOpacity>
        {otherfuncs}
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);