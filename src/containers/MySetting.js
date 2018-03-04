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
  ScrollView,
  Image,
  Modal
} from 'react-native';

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
    flex:1,
    justifyContent:'center',
    alignItems:'stretch',
    backgroundColor: '#F5F4F4'
  },
  scrolldiv: {
    flex:1
  },
  funcbutton: {
    justifyContent:'center',
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
    paddingLeft: 20,
    paddingRight: 20,
    height:48
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
  },
  funcText: {
    fontSize: 16,
    color: 'black',
  },
  subbutton: {
    backgroundColor: '#FE8F45',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 22
  },
  subText: {
    fontSize: 16,
    color: '#ffffff',
    alignSelf: 'center'
  },
  modallay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalinner: {
    borderRadius: 4,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    margin: 22
  },
  modaltitle: {
    padding: 10,
    fontSize: 16,
    color: '#FE8F45',
    borderBottomWidth: 2,
    borderColor: '#FE8F45'
  },
  modalinp: {
    fontSize: 16
  },
  horizontalLine: {
    marginTop: 5,
    height: 0.5,
    backgroundColor: '#ccc',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    borderRadius: 4,
  },
  verticalLine: {
    width: 0.5,
    height: 44,
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  rowfield: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  fieldtitle: {
    fontSize: 14,
    color: 'gray',
    paddingBottom:5
  },
  fieldvalue: {
    color: 'black',
    fontSize: 16
  }
});

class MySetting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      actions,
      auth,
      vouch,
      profile
    } = this.props;
    let user={
      userName:'',
      fullName:'',
      authorityTypeName:'',
      deptName:'',
      whName:''
    };
    if(profile && profile.user){
      user = profile.user;
    }
    return (
      <ScrollView style={styles.scrolldiv}>
        <View style={styles.container}>
          <View style={styles.rowfield}>
            <Text style={styles.fieldtitle} allowFontScaling={false}>企业名称</Text>
            <Text style={styles.fieldvalue} allowFontScaling={false}>{auth.info.name}</Text>
          </View>
          <View style={styles.rowfield}>
            <Text style={styles.fieldtitle} allowFontScaling={false}>用户名</Text>
            <Text style={styles.fieldvalue} allowFontScaling={false}>{user.userName}</Text>
          </View>
          <View style={styles.rowfield}>
            <Text style={styles.fieldtitle} allowFontScaling={false}>姓名</Text>
            <Text style={styles.fieldvalue} allowFontScaling={false}>{user.fullName}</Text>
          </View>
          <View style={styles.rowfield}>
            <Text style={styles.fieldtitle} allowFontScaling={false}>权限</Text>
            <Text style={styles.fieldvalue} allowFontScaling={false}>{user.authorityTypeName}</Text>
          </View>
          <View style={styles.rowfield}>
            <Text style={styles.fieldtitle} allowFontScaling={false}>部门</Text>
            <Text style={styles.fieldvalue} allowFontScaling={false}>{user.deptName}</Text>
          </View>
          <View style={styles.rowfield}>
            <Text style={styles.fieldtitle} allowFontScaling={false}>仓库</Text>
            <Text style={styles.fieldvalue} allowFontScaling={false}>{user.whName}</Text>
          </View>
          <TouchableOpacity style={styles.funcbutton} onPress={()=>{Actions.ModPwd();}}>
            <Text style={styles.funcText} allowFontScaling={false}>登录密码</Text>
            <Text style={styles.icon} allowFontScaling={false}>
              {icon('qiehuanqiyou')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subbutton} onPress={()=>actions.logout(auth.token.access_token,auth.info.api)}>
            <Text style={styles.subText} allowFontScaling={false}>退出登录</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MySetting);