import React, {
  Component
}
from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackAndroid,
  NetInfo,
  Platform
}
from 'react-native';

import {
  Actions,
  Router,
  Scene,
  TabBar,
  ActionConst,
  Reducer
}
from 'react-native-router-flux';

import {
  Provider,
  connect
}
from 'react-redux';

import Toast from 'react-native-root-toast';

import App from './containers/App';
import Login from './containers/Login';
import Home from './containers/Home';
import MySetting from './containers/MySetting';
import ModPassword from './containers/ModPassword';
import Message from './containers/Message';

import configureStore from './store/configureStore';
import TabIcon from './components/TabIcon';
import MyGiftedChat from './containers/MyGiftedChat';
import CallVouch from './containers/CallVouch';
import CallVouchAdd from './containers/CallVouchAdd';
import ReadyVouch from './containers/ReadyVouch';
import ReadVouch from './containers/ReadVouch';
import VouchsAdd from './containers/VouchsAdd';
import EditVouch from './containers/EditVouch';
import VouchsEdit from './containers/VouchsEdit';
import ReadVerifyVouch from './containers/ReadVerifyVouch';
import SendVouch from './containers/SendVouch';
import ReceiveVouch from './containers/ReceiveVouch';
import ProdinVouch from './containers/ProdinVouch';
import PchinVouch from './containers/PchinVouch';
import MakeupVouch from './containers/MakeupVouch';
import VouchsEditEx from './containers/VouchsEditEx';
import VouchsAddEx from './containers/VouchsAddEx';
import SendVouchAdd from './containers/SendVouchAdd';
import MakeupVouchAdd from './containers/MakeupVouchAdd';
import ProdinVouchAdd from './containers/ProdinVouchAdd';
import VouchsAddExIn from './containers/VouchsAddExIn';
import VouchsEditExIn from './containers/VouchsEditExIn';
import PchinVouchAdd from './containers/PchinVouchAdd';
import MakeupVouchSum from './containers/MakeupVouchSum';
import MakeupProdinVouch from './containers/MakeupProdinVouch';
import MakeupProdinReadVouch from './containers/MakeupProdinReadVouch';
import MakeupSendVouch from './containers/MakeupSendVouch';
import ReportCurrentStock from './containers/ReportCurrentStock';
import ReportSalesDept from './containers/ReportSalesDept';
import ReportSalesDeptDaily from './containers/ReportSalesDeptDaily';
import ReportCardTop from './containers/ReportCardTop';
import BarcodeScannerApp from './containers/BarcodeScannerApp';
import ReadVouchScan from './containers/ReadVouchScan';
import CheckVouch from './containers/CheckVouch';
import CheckVouchAdd from './containers/CheckVouchAdd';
import ReadCheckVouch from './containers/ReadCheckVouch';
import DeptCheckVouch from './containers/DeptCheckVouch';
import DeptCheckVouchAdd from './containers/DeptCheckVouchAdd';
import EnterpriseInfo from './containers/EnterpriseInfo';

import icon from './constants/iconfont.js';
import Error from './components/Error';
import JPushModule from 'jpush-react-native';
import AppUpdate from './containers/AppUpdate';
import _backButtonImage from './images/back_chevron.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderColor: '#cacaca',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#F6F6F6'
  },
  icon: {
    alignSelf: 'center',
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#FE8F45',
    paddingLeft: 10,
    paddingRight: 10
  },
  iconscan: {
    alignSelf: 'center',
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#FE8F45',
    paddingLeft: 10,
    paddingRight: 20
  },
  iconscanview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  iconview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  navbarstyle: {
    backgroundColor: '#220A00',
    borderBottomWidth: 0
  },
  nvatitlestyle: {
    color: '#ffffff',
    fontSize: 16
  },
  nvabacktextstyle: {
    fontSize: 16,
    color: '#FE8F45',
    alignSelf: 'center'
  },
  iconnav: {
    alignSelf: 'center',
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#FE8F45',
    paddingLeft: 20,
    paddingRight: 20
  }
});

const getSceneStyle = ( /* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null
  };
  if (computedProps.isActive) {
    if (Platform.OS == 'ios') {
      style.marginTop = computedProps.hideNavBar ? 0 : 64;
      style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    } else {
      style.marginTop = computedProps.hideNavBar ? 0 : 54;
      style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
  }
  return style;
};

const store = configureStore();
const RouterWithRedux = connect()(Router);
// const reducerCreate = params => {
//   const defaultReducer = Reducer(params);
//   return (state, action) => {
//     if (action.scene) {
//       console.log('react-native-router-flux action.scene.key:', action.scene.key);
//     } else if (action.key) {
//       console.log('react-native-router-flux action.key:', action.key);
//     } else {
//       console.log('react-native-router-flux action:', action);
//       //console.log(state);
//     }
//     //createReducer={reducerCreate}
//     return defaultReducer(state, action);
//   }
// };

const getRightButton = (vouchtype, bustype) => {
  if (vouchtype == '009') {
    return (
      <TouchableOpacity style={styles.iconview} onPress={() => Actions.VouchsAddEx({vouchType:vouchtype})}>
          <Text style={styles.iconnav} allowFontScaling={false}>{icon('tianjia')}</Text>
        </TouchableOpacity>
    );
  } else if (vouchtype == '006' || vouchtype == '001') {
    return (
      <TouchableOpacity style={styles.iconview} onPress={() => Actions.VouchsAddExIn({vouchType:vouchtype})}>
          <Text style={styles.iconnav} allowFontScaling={false}>{icon('tianjia')}</Text>
        </TouchableOpacity>
    );
  } else if (vouchtype == '016') {
    return (
      <TouchableOpacity style={styles.iconview} onPress={() => Actions.VouchsAdd({vouchType:vouchtype,busType:bustype})}>
          <Text style={styles.iconnav} allowFontScaling={false}>{icon('tianjia')}</Text>
        </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.iconview} onPress={() => Actions.VouchsAdd({vouchType:vouchtype})}>
          <Text style={styles.iconnav} allowFontScaling={false}>{icon('tianjia')}</Text>
        </TouchableOpacity>
    );
  }
}

// function handleFirstConnectivityChange(reach) {
//   var info='';
//   if(reach==='NONE'){
//     info='当前处于离线状态';
//   }else{
//     info='当前网络已切换为：'+reach;
//   }
//   Toast.show(info, {
//     duration: Toast.durations.LONG,
//     position: -60,
//     delay: 0,
//   });
//   // NetInfo.removeEventListener(
//   //   'change',
//   //   handleFirstConnectivityChange
//   // );
// }

// NetInfo.addEventListener(
//   'change',
//   handleFirstConnectivityChange
// );

class CloudEasyShop extends Component {
  componentDidMount() {
    if (Platform.OS == 'android') {
      JPushModule.initPush();

      let params = {
        url: 'http://download.kmdx.cn/app/json/cloudeasyshop.json',
        version: 25
      };
      AppUpdate.init(params);
    }
  }

  render() {
    return (
      <Provider store={store}>
            <RouterWithRedux hideNavBar={true} 
                getSceneStyle={getSceneStyle}
            >
                <Scene key="root">
                    <Scene key="App"
                        component={App}
                        title="App"
                        hideTabBar={true} />
                    <Scene key="Login"
                        component={Login}
                        title="Login"
                        hideTabBar={true}
                        type={ActionConst.REPLACE} />
                    <Scene key="EnterpriseInfo"
                        component={EnterpriseInfo}
                        title="EnterpriseInfo"
                        hideTabBar={true}
                        type={ActionConst.REPLACE} />
                    <Scene key="Tabbar" tabs={true} default="Main" tabBarStyle={styles.tabBarStyle} type={ActionConst.REPLACE}>
                        <Scene key="CallVouch"
                            icon={TabIcon}
                            iconName={"shangpin"}
                            hideNavBar={false}
                            component={CallVouch}
                            title="叫货"
                            navigationBarStyle={styles.navbarstyle}
                            titleStyle={styles.nvatitlestyle}
                            titleProps={{allowFontScaling:false}}
                            renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.CallVouchAdd()}>
                              <Text style={styles.icon} allowFontScaling={false}>{icon('tianjia')}</Text></TouchableOpacity>} />
                        <Scene key="ReadyVouchRoot"
                            icon={TabIcon}
                            iconName={"zhongtumoshi"}
                            hideNavBar={false}
                            title="备货"
                            navigationBarStyle={styles.navbarstyle}
                            titleStyle={styles.nvatitlestyle}
                            titleProps={{allowFontScaling:false}}
                            backButtonImage={_backButtonImage}>
                            <Scene key="ReadyVouch" component={ReadyVouch} title="备货"
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null} />
                            <Scene key="ProdinVouch" component={ProdinVouch} title="产成品入库"
                              onBack={() => Actions.pop()}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="备货"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle}
                              renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.ProdinVouchAdd()}>
                              <Text style={styles.icon} allowFontScaling={false}>{icon('tianjia')}</Text></TouchableOpacity>} />
                            <Scene key="PchinVouch" component={PchinVouch} title="采购入库"
                              onBack={() => Actions.pop()}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="备货"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle}
                              renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.PchinVouchAdd()}>
                              <Text style={styles.icon} allowFontScaling={false}>{icon('tianjia')}</Text></TouchableOpacity>} />
                            <Scene key="MakeupVouch" component={MakeupVouch} title="生产计划"
                              onBack={() => Actions.pop()}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="备货"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle}
                              renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.MakeupVouchAdd()}>
                              <Text style={styles.icon} allowFontScaling={false}>{icon('tianjia')}</Text></TouchableOpacity>} />
                        </Scene>
                        <Scene key="SendVouch"
                            icon={TabIcon}
                            iconName={"chuku"}
                            hideNavBar={false}
                            component={SendVouch}
                            title="发货"
                            navigationBarStyle={styles.navbarstyle}
                            titleStyle={styles.nvatitlestyle}
                            titleProps={{allowFontScaling:false}}
                            renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.SendVouchAdd()}>
                              <Text style={styles.icon} allowFontScaling={false}>{icon('tianjia')}</Text></TouchableOpacity>} />
                        <Scene key="ReceiveVouch"
                            icon={TabIcon}
                            iconName={"daoru"}
                            hideNavBar={false}
                            component={ReceiveVouch}
                            navigationBarStyle={styles.navbarstyle}
                            titleStyle={styles.nvatitlestyle}
                            title="收货"
                            titleProps={{allowFontScaling:false}} />
                        <Scene key="HomeRoot"
                            initial={true}
                            icon={TabIcon}
                            iconName={"yonghutouxiang"}
                            hideNavBar={false}
                            navigationBarStyle={styles.navbarstyle}
                            titleStyle={styles.nvatitlestyle}
                            title="我的"
                            titleProps={{allowFontScaling:false}}
                            backButtonImage={_backButtonImage}>
                            <Scene key="Home"
                              hideNavBar={false}
                              component={Home}
                              title="我的"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              renderBackButton={()=><TouchableOpacity style={styles.iconscanview} onPress={() => Actions.BarcodeScannerApp()}>
                                <Text style={styles.iconscan} allowFontScaling={false}>{icon('saoyisao')}</Text></TouchableOpacity>} 
                              renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.Message()}>
                                <Text style={styles.icon} allowFontScaling={false}>{icon('pinglun')}</Text></TouchableOpacity>} />
                            <Scene key="SettingHome" component={MySetting} title="个人信息"
                              onBack={() => Actions.pop()}
                              hideTabBar={true}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="我的"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle} />
                            <Scene key="ModPwd" component={ModPassword} title="修改密码"
                              onBack={() => Actions.pop()}
                              hideTabBar={true}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="设置"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle} />
                            <Scene key="ReportCurrentStock" component={ReportCurrentStock} title="库存现存量"
                              onBack={() => Actions.pop()}
                              hideTabBar={true}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="我的"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle} />
                            <Scene key="ReportSalesDept" component={ReportSalesDept} title="销售额统计"
                              onBack={() => Actions.pop()}
                              hideTabBar={true}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="我的"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle} />
                            <Scene key="ReportCardTop" component={ReportCardTop} title="会员消费排行榜"
                              onBack={() => Actions.pop()}
                              hideTabBar={true}
                              hideNavBar={false}
                              duration={1}
                              panHandlers={null}
                              backTitle="我的"
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle} />
                            <Scene key="BarcodeScannerApp" component={BarcodeScannerApp} title="扫描二维码"
                              onBack={() => Actions.pop()}
                              hideNavBar={false}
                              hideTabBar={true}
                              navigationBarStyle={styles.navbarstyle}
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              duration={1}
                              panHandlers={null}
                              backButtonImage={_backButtonImage} />
                            <Scene key="ReadVouchScan"  component={ReadVouchScan} title="收货单明细"
                              onBack={() => Actions.pop()}
                              hideNavBar={false}
                              hideTabBar={true}
                              duration={1}
                              panHandlers={null}
                              type={ActionConst.REPLACE}
                              navigationBarStyle={styles.navbarstyle}
                              titleStyle={styles.nvatitlestyle}
                              titleProps={{allowFontScaling:false}}
                              backButtonTextStyle={styles.nvabacktextstyle}
                              backButtonImage={_backButtonImage} />
                        </Scene>
                    </Scene>
                    <Scene key="Message"  component={Message} title="消息"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="我的"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="Comment"  component={MyGiftedChat} title="查看消息"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="消息"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="CallVouchAdd"  component={CallVouchAdd} title="添加叫货单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="SendVouchAdd"  component={SendVouchAdd} title="添加调拨单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="ProdinVouchAdd"  component={ProdinVouchAdd} title="添加产成品入库单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="MakeupVouchAdd"  component={MakeupVouchAdd} title="创建生产计划单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="PchinVouchAdd"  component={PchinVouchAdd} title="添加采购入库单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="ReadVouch"  component={ReadVouch} title="单据明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} 
                        getTitle={(para)=>{
                          let title = '';
                          switch(para.vouchType){
                            case '012':
                              title='叫货单明细'
                              break;
                            case '014':
                              title='生产计划单明细'
                              break;
                            case '009':
                              title='调拨单明细'
                              break;
                            case '009001':
                              title='调拨单明细'
                              break;
                            case '003':
                              title='收货单明细'
                              break;
                            case '006':
                              title='产成品入库单明细'
                              break;
                            case '006001':
                              title='产成品入库单明细'
                              break;
                            case '001':
                              title='采购入库单明细'
                              break;
                          }
                          return title;
                        }}
                        renderRightButton={(para)=>{
                          let rightButton = null;
                          switch(para.vouchType){
                          case '012':
                              rightButton =  getRightButton('012');
                              break;
                            case '014':
                              rightButton =  getRightButton('014');
                              break;
                            case '009':
                              rightButton =  getRightButton('009');
                              break;
                            case '009001':
                              rightButton =  getRightButton('009');
                              break;
                            case '006':
                              rightButton =  getRightButton('006');
                              break;
                            case '006001':
                              rightButton =  getRightButton('006');
                              break;
                            case '001':
                              rightButton =  getRightButton('001');
                              break;
                          }
                          return rightButton;
                        }}/>
                    <Scene key="ReadCheckVouch"  component={ReadCheckVouch} title="盘点单明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage}
                        getTitle={(para)=>{
                          let title = '';
                          switch(para.vouchType){
                            case '010':
                              title='库存盘点单明细'
                              break;
                            case '016':
                              title='门店盘点单明细'
                              break;
                          }
                          return title;
                        }}
                        renderRightButton={(para)=>{
                          let rightButton = null;
                          switch(para.vouchType){
                            case '016':
                              if(para.isVerify===false){
                                rightButton =  getRightButton('016',para.busType);
                              }
                              break;
                          }
                          return rightButton;
                        }}/>
                    <Scene key="ReadVerifyVouch"  component={ReadVerifyVouch} title="单据明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage}
                        getTitle={(para)=>{
                          let title = '';
                          switch(para.vouchType){
                            case '012':
                              title='叫货单明细'
                            break;
                          case '014':
                              title='生产计划单明细'
                            break;
                          case '009':
                              title='调拨单明细'
                            break;
                          case '009001':
                              title='调拨单明细'
                            break;
                          case '003':
                              title='收货单明细'
                            break;
                          case '006':
                              title='产成品入库单明细'
                            break;
                          case '006001':
                              title='产成品入库单明细'
                            break;
                          case '001':
                              title='采购入库单明细'
                            break;
                          }
                          return title;
                        }} />
                    
                    <Scene key="EditVouch"  component={EditVouch} title="修改单据"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="VouchsAdd"  component={VouchsAdd} title="添加明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="VouchsAddEx"  component={VouchsAddEx} title="添加明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="VouchsAddExIn"  component={VouchsAddExIn} title="添加明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="VouchsEdit"  component={VouchsEdit} title="修改明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="VouchsEditEx"  component={VouchsEditEx} title="修改明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="VouchsEditExIn"  component={VouchsEditExIn} title="修改明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="MakeupProdinReadVouch"  component={MakeupProdinReadVouch} title="单据明细"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        panHandlers={null}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="MakeupVouchSum"  component={MakeupVouchSum} title="叫货汇总"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        type={ActionConst.REPLACE}
                        backButtonImage={_backButtonImage} />
                    <Scene key="MakeupProdinVouch"  component={MakeupProdinVouch} title="产成品入库单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null} 
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        type={ActionConst.REPLACE}
                        backButtonImage={_backButtonImage} />
                    <Scene key="MakeupSendVouch"  component={MakeupSendVouch} title="调拨单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        type={ActionConst.REPLACE}
                        backButtonImage={_backButtonImage} />
                    <Scene key="Error"  component={Error} title="温馨提示"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        type={ActionConst.REPLACE}
                        backButtonImage={_backButtonImage} />
                    <Scene key="ReportSalesDeptDaily" component={ReportSalesDeptDaily} title="销售额统计(按天)"
                      onBack={() => Actions.pop()}
                      hideTabBar={true}
                      hideNavBar={false}
                      navigationBarStyle={styles.navbarstyle}
                      titleStyle={styles.nvatitlestyle}
                      titleProps={{allowFontScaling:false}}
                      duration={1}
                      panHandlers={null}
                      backButtonImage={_backButtonImage} />
                    <Scene key="CheckVouch"  component={CheckVouch} title="库存盘点单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="我的"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage}
                        renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.CheckVouchAdd()}>
                          <Text style={styles.icon} allowFontScaling={false}>{icon('tianjia')}</Text></TouchableOpacity>}/>
                    <Scene key="CheckVouchAdd"  component={CheckVouchAdd} title="创建库存盘点单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    <Scene key="DeptCheckVouch"  component={DeptCheckVouch} title="门店盘点单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="我的"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage}
                        renderRightButton={()=><TouchableOpacity style={styles.iconview} onPress={() => Actions.DeptCheckVouchAdd()}>
                          <Text style={styles.icon} allowFontScaling={false}>{icon('tianjia')}</Text></TouchableOpacity>}/>
                    <Scene key="DeptCheckVouchAdd"  component={DeptCheckVouchAdd} title="添加门店盘点单"
                        onBack={() => Actions.pop()}
                        hideNavBar={false}
                        hideTabBar={true}
                        duration={1}
                        panHandlers={null}
                        backTitle="取消"
                        navigationBarStyle={styles.navbarstyle}
                        titleStyle={styles.nvatitlestyle}
                        titleProps={{allowFontScaling:false}}
                        backButtonTextStyle={styles.nvabacktextstyle}
                        backButtonImage={_backButtonImage} />
                    
                </Scene>
            </RouterWithRedux>
        </Provider>
    );
  }
}

export default function native() {
  AppRegistry.registerComponent('CloudEasyShop', () => CloudEasyShop);
}