import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import icon from '../constants/iconfont.js';
import Toast from 'react-native-root-toast';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F4F4',
  },
  scrollcontainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: Platform.OS=='ios' ? 40 : 20,
    alignSelf: 'center'
  },
  inputblock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 22,
    marginLeft: 22,
    marginRight: 22,
    borderRadius: 4,
  },
  icon: {
    margin: 13,
    fontFamily: 'iconfont',
    fontSize: 26,
    color: '#FE8F45'
  },
  inputdiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderLeftWidth: 2,
    borderColor: '#cacaca',
  },
  textinp: {
    flex:1,
    fontSize: 16,
    paddingLeft:10,
    paddingRight:10
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FE8F45',
    padding: 10,
    borderRadius: 4,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  setbutton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 22,
    alignSelf: 'flex-end',
  }
});

export default class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        show: false,
        submitdisable:false
      };
      this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin() {
    const {
      actions,
      auth
    } = this.props;
    this.setState({submitdisable:true});
    if (this.state.username == null || this.state.username == '') {
      Alert.alert('提示', '请输入用户名', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    }else if (this.state.password == null || this.state.password == '') {
      Alert.alert('提示', '请输入密码', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    }else{
      actions.login(this.state.username,this.state.password,auth.info.api)
        .then(()=>{if(!this.props.auth.isLogined){this.setState({submitdisable:false});}});
    }
  }

  render() {
    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollcontainer} keyboardShouldPersistTaps={true}>
        <Image style={styles.logo} source={require('../images/logo.png')} />
        <View style={styles.inputblock}>
          <Text style={styles.icon} allowFontScaling={false}>
            {icon('yonghu')}
          </Text>
          <View style={styles.inputdiv}>
            <TextInput style={styles.textinp} placeholder='请输入用户名' underlineColorAndroid='transparent'
              onChangeText={(text) => {this.setState({username: text.replace(/\s/g, '')});}}>
            </TextInput>
          </View>
        </View>
        <View style={styles.inputblock}>
          <Text style={styles.icon} allowFontScaling={false}>
            {icon('suoding')}
          </Text>
          <View style={styles.inputdiv}>
            <TextInput style={styles.textinp} secureTextEntry={true} placeholder='请输入密码' 
              underlineColorAndroid='transparent' onChangeText={(text) => {this.setState({password: text.replace(/\s/g, '')});}}>
            </TextInput>
          </View>
        </View>
        <View style={styles.inputblock}>
          <TouchableOpacity style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9' 
            disabled={this.state.submitdisable} onPress={this.submitLogin} >
            <Text style={styles.buttontext} allowFontScaling={false}>登  录</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    )
  }
}