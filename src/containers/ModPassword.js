import React, {
  Component,
  PropTypes
}
from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  ActivityIndicator,
  Modal,
  Alert
}
from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5F4F4',
  },
  inputdiv: {
    height: 44,
    backgroundColor: '#ffffff',
    margin: 22,
    borderRadius: 4,
    marginBottom: 0
  },
  textinp: {
    fontSize: 16,
    flex: 1,
    paddingLeft: 11,
    paddingRight: 11
  },
  button: {
    backgroundColor: '#FE8F45',
    padding: 10,
    marginTop: 22
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorinfo: {
    marginTop: 10,
    marginLeft: 22,
    marginRight: 22,
    color: "red"
  }
});

class ModPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      newpassword: '',
      confpassword: '',
      submitdisable: false
    };
    this.submitModifyPwd = this.submitModifyPwd.bind(this);
  }

  submitModifyPwd() {
    const {
      actions,
      auth
    } = this.props;
    this.setState({
      submitdisable: true
    });
    let isalleq = true;
    let firstchar = '';
    if (this.state.newpassword.length > 0) {
      firstchar = this.state.newpassword.substr(0, 1);
    }
    for (var i = 1; i < this.state.newpassword.length; i++) {
      var chartmp = this.state.newpassword.substr(i, 1);
      if (firstchar != chartmp) {
        isalleq = false;
      }
    }
    if (this.state.oldpassword == null || this.state.oldpassword == '') {
      Alert.alert('提示', '请输入原密码', [{
        text: '确定'
      }]);
      this.setState({
        submitdisable: false
      });
    } else if (this.state.newpassword == null || this.state.newpassword == '') {
      Alert.alert('提示', '请输入新密码', [{
        text: '确定'
      }]);
      this.setState({
        submitdisable: false
      });
    } else if (this.state.confpassword == null || this.state.confpassword == '') {
      Alert.alert('提示', '请输入确认密码', [{
        text: '确定'
      }]);
      this.setState({
        submitdisable: false
      });
    } else if (isalleq || this.state.newpassword == '123456') {
      Alert.alert('提示', '新密码过于简单', [{
        text: '确定'
      }]);
      this.setState({
        submitdisable: false
      });
    } else {
      var reqdata = {
        OldPassword: this.state.oldpassword,
        NewPassword: this.state.newpassword,
        ConfirmPassword: this.state.confpassword
      };
      actions.resetPassword(auth.token.access_token, reqdata, auth.info.api)
        .then(() => {
          this.setState({
            submitdisable: false
          })
        });
    }
  }

  render() {
    const {
      actions,
      auth
    } = this.props;
    var submitdiscolor = {
      backgroundColor: this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    return (
      <View style={styles.container}>
            <Modal visible={auth.isFetching}
              onRequestClose={()=>{return false;}} transparent={true} >
              <ActivityIndicator style={styles.spinner} animating={auth.isFetching} size='large' color='#FE8F45' />
            </Modal>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} secureTextEntry={true} placeholder='当前密码' 
                underlineColorAndroid='transparent' onChangeText={(text) => {this.setState({oldpassword: text.replace(/\s/g, ''),errshow:false});}}>
              </TextInput>
            </View>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} secureTextEntry={true} placeholder='新密码(6-20位)' 
                underlineColorAndroid='transparent' onChangeText={(text) => {this.setState({newpassword: text.replace(/\s/g, ''),errshow:false});}}>
              </TextInput>
            </View>
            <View style={styles.inputdiv}>
              <TextInput style={styles.textinp} secureTextEntry={true} placeholder='确认新密码' 
                underlineColorAndroid='transparent' onChangeText={(text) => {this.setState({confpassword: text.replace(/\s/g, ''),errshow:false});}}>
              </TextInput>
            </View>
            <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
              disabled={this.state.submitdisable} onPress={this.submitModifyPwd}>
              <Text style={styles.buttontext} allowFontScaling={false}>确认提交</Text>
            </TouchableHighlight>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModPassword);