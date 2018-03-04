import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginForm from '../components/LoginForm'
import * as actions from '../actions';


class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { actions,auth } = this.props;
    return(
      <LoginForm actions={actions} auth={auth} />
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);