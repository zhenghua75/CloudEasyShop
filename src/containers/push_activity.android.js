'use strict';

import React from 'react';
import ReactNative from 'react-native';

const {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  PropTypes,
  requireNativeComponent,
  NativeModules,
  ScrollView,
  StyleSheet,
  DeviceEventEmitter,
} = ReactNative;

import JPushModule from 'jpush-react-native';
const receiveCustomMsgEvent = "receivePushMsg";
const receiveNotificationEvent = "receiveNotification";
export default class PushActivity  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bg: '#ffffff',
      appkey: 'AppKey',
      imei: 'IMEI',
      package: 'PackageName',
      deviceId: 'DeviceId',
      version: 'Version',
      pushMsg: 'PushMessage',
      registrationId: 'registrationId',
    };

    this.jumpSetActivity = this.jumpSetActivity.bind(this);
    this.onInitPress = this.onInitPress.bind(this);
    this.onStopPress = this.onStopPress.bind(this);
    this.onResumePress = this.onResumePress.bind(this);
    this.onGetRegistrationIdPress = this.onGetRegistrationIdPress.bind(this);
  }
    
  jumpSetActivity() {
    this.props.navigator.push({ name:'setActivity' }); 
  }

  onInitPress() {
      JPushModule.initPush();
  }

  onStopPress() {
    JPushModule.stopPush();
  }

  onResumePress() {
    JPushModule.resumePush();
  }

  onGetRegistrationIdPress() {
    JPushModule.getRegistrationID((registrationId) => {
      this.setState({registrationId: registrationId});
    });
  }

  componentWillMount() {
    JPushModule.getInfo((map) => {
      this.setState({
            appkey: map.myAppKey,
            imei: map.myImei,
            package: map.myPackageName,
            deviceId: map.myDeviceId,
            version: map.myVersion
      });
    });

  }

  componentDidMount() {
    //自定义消息
    JPushModule.addReceiveCustomMsgListener((message) => {
      this.setState({pushMsg: message});
    });
    //通知
    JPushModule.addReceiveNotificationListener((map) => {
    });
    //打开通知
    JPushModule.addReceiveOpenNotificationListener((map) => {
    })
  }

  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener(receiveCustomMsgEvent);
    JPushModule.removeReceiveNotificationListener(receiveNotificationEvent);
  }

    render() {
        return (
            <ScrollView style = { styles.parent }>
            
            <Text style = { styles.textStyle }>
              { this.state.appkey }
            </Text>
            <Text style = { styles.textStyle }>
              { this.state.imei }
            </Text>
            <Text style  = { styles.textStyle }>
              { this.state.package }
            </Text>
            <Text style = { styles.textStyle }>
              { this.state.deviceId }
            </Text> 
            <Text style = { styles.textStyle }>
              { this.state.version }
            </Text>
            <TouchableHighlight
              underlayColor = '#0866d9'
              activeOpacity = { 0.5 }
              style = { styles.btnStyle }
              onPress = { this.jumpSetActivity }>
              <Text style = { styles.btnTextStyle }>
                设置
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor = '#0866d9'
              activeOpacity = { 0.5 }
              style = { styles.btnStyle }
              onPress = { this.onInitPress }>
                <Text style = { styles.btnTextStyle }>
                  INITPUSH
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor = '#e4083f'
              activeOpacity = { 0.5 }
              style = { styles.btnStyle }
              onPress = { this.onStopPress }>
                <Text style = { styles.btnTextStyle }>
                  STOPPUSH
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor = '#f5a402'
              activeOpacity = { 0.5 }
              style = { styles.btnStyle }
              onPress = { this.onResumePress }>
                <Text style = { styles.btnTextStyle }> 
                  RESUMEPUSH
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor = '#f5a402'
              activeOpacity = { 0.5 }
              style = { styles.btnStyle }
              onPress = { this.onGetRegistrationIdPress }>
                <Text style = { styles.btnTextStyle }> 
                  GET REGISTRATIONID
                </Text>
            </TouchableHighlight>
            <Text style = { styles.textStyle }>
              { this.state.pushMsg }
            </Text>
            <Text style = {styles.textStyle} >
              { this.state.registrationId }
            </Text>
            </ScrollView>

          )
    }
}

var styles = StyleSheet.create({
  parent: {
    padding: 15,
    backgroundColor: '#f0f1f3'
  },

  textStyle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#808080'
  },

  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7'
  },
  btnTextStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: '#ffffff'
  },
  inputStyle: {
    borderColor: '#48bbec',
    borderWidth: 1,

  },
});