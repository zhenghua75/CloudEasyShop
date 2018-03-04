import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import icon from '../constants/iconfont.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F4F4',
  },
  scrollcontainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#94CEFF'
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
  advview:{
    alignItems:'center',
    marginBottom:20
  },
  advtitle:{
    fontSize:26,
    color:'#ffffff',
    fontWeight:'bold'
  },
  advdes:{
    fontSize:16,
    color:'#ffffff'
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
    borderColor: '#cacaca'
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

class EnterpriseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        shortname: '',
        submitdisable:false
      };
      this.getEnterpriseInfo = this.getEnterpriseInfo.bind(this);
  }
  getEnterpriseInfo() {
    const {
      actions
    } = this.props;
    this.setState({submitdisable:true});
    if (this.state.shortname == null || this.state.shortname == '') {
      Alert.alert('提示', '请输入企业简称', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    }else{
      actions.getRemoteEnterpriseInfo(this.state.shortname)
        .then(()=>{if(!this.props.auth.info){this.setState({submitdisable:false});}});
      }
  }
  render() {
    const { actions,auth } = this.props;
    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    return(
      <View style={styles.container}>
        <ScrollView style={styles.scrollcontainer} keyboardShouldPersistTaps={true}>
        <Image style={styles.logo} source={require('../images/logo.png')} />
        <View style={styles.advview}>
          <Text style={styles.advtitle} allowFontScaling={false}>云易店</Text>
          <Text style={styles.advdes} allowFontScaling={false}>高效率商业助手</Text>
        </View>

        <View style={styles.inputblock}>
          <Text style={styles.icon} allowFontScaling={false}>
            {icon('gongsi')}
          </Text>
          <View style={styles.inputdiv}>
            <TextInput style={styles.textinp} placeholder='请输入企业简称' underlineColorAndroid='transparent'
              onChangeText={(text) => {this.setState({shortname: text.replace(/\s/g, '')});}}>
            </TextInput>
          </View>
        </View>
        <View style={styles.inputblock}>
          <TouchableOpacity style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9' 
            disabled={this.state.submitdisable} onPress={this.getEnterpriseInfo} >
            <Text style={styles.buttontext} allowFontScaling={false}>确  认</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

      </View>
    );
  }
  
}



function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions,dispatch),
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(EnterpriseInfo);