import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
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

import WareHousePicker from '../components/WareHousePicker';
import InventoryPickerModal from '../components/InventoryPickerModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  inputblocktop: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
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
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10
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
  desview:{
    flex:1,
    justifyContent:'center',
    alignSelf:'center'
  },
  destext:{
    fontSize:16,
    lineHeight:30,
    paddingLeft:20,
    paddingRight:20
  }
});

class CheckVouchAdd extends Component {
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
    this.submitAddVouch = this.submitAddVouch.bind(this);
  }

  submitAddVouch() {
    const {
      actions,
      auth,
      profile
    } = this.props;
    this.setState({submitdisable:true});
    if (profile.user.whId == null || profile.user.whId == '') {
      Alert.alert('提示', '用户不属于任何仓库，请联系系统管理员配置用户所属仓库', [{
        text: '确定'
      }]);
      this.setState({submitdisable:false});
    } else {
      let vouchData = {
        action: 'create',
        data: [{
          Vouch: {
            VouchType: '010',
            BusType: null,
            Step: 0,
            ToWhId: profile.user.whId,
            VouchDate: this.state.vouchdate,
            Memo: null
          }
        }]
      };
      actions.vouch(auth.token.access_token, '010', vouchData,auth.info.api)
        .then(()=>{
          this.setState({submitdisable:false});
          actions.getVouch(auth.token.access_token, {
            VouchType: '010',
            IsVerify: false,
            VouchDate: ''
          },auth.info.api);
        });
    }
  }

  render() {
    const {
      actions,
      auth,
      vouch,
      profile
    } = this.props;

    var submitdiscolor={
      backgroundColor:this.state.submitdisable ? '#a9a9a9' : '#FE8F45'
    }
    return (
      <View style={styles.container}>
        <View style={styles.inputblocktop}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            盘点仓库
          </Text>
          <View style={styles.inputdiv}>
            <Text style={styles.textinfo} allowFontScaling={false}>{profile.user.whName}</Text>
          </View>
        </View>
        <View style={styles.desview}>
          <Text style={styles.destext} allowFontScaling={false}>
            库存盘点单是当前仓库全库存盘点，请点击“创建”，生成库存盘点单，再修改存货的盘点数量。
          </Text>
        </View>
        <View style={styles.buttonblock}>
          <TouchableHighlight style={[styles.button,submitdiscolor]} activeOpacity={0.7} underlayColor='#a9a9a9'
            disabled={this.state.submitdisable} onPress={()=>{this.submitAddVouch();}}>
            <Text style={styles.buttontext} allowFontScaling={false}>创  建</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckVouchAdd);