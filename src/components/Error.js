import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Actions
} from "react-native-router-flux";

import icon from '../constants/iconfont.js';

var {
  height: deviceHeight
} = Dimensions.get("window");

var styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 60,
    color: '#FE8F45'
  },
  prompt: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: 'black'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -deviceHeight
    }).start(Actions.pop);
  }

  render() {
    var viewtransf = {
      transform: [{
        translateY: this.state.offset
      }]
    };
    return (
      <Animated.View style = {[styles.container,viewtransf]} >
        <View style = {styles.content}>
          <Text style={styles.icon} allowFontScaling={false}>
            {icon('31wentifankui')}
          </Text>
          <Text style={styles.prompt} allowFontScaling={false}>{this.props.data}</Text> 
          <TouchableOpacity onPress = {this.closeModal.bind(this)} >
            <Text allowFontScaling={false}>返回</Text>
          </TouchableOpacity>
        </View> 
      </Animated.View>
    );
  }
}