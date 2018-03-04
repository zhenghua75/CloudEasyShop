import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native"

import icon from '../constants/iconfont.js';

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  checkbox: {
    width: 16,
    height: 16
  },
  labelContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  label: {
    fontSize: 15,
    lineHeight: 15,
    color: 'grey',
  },
  icon: {
    fontFamily: 'fontawesome',
    fontSize: 16,
    color: '#FE8F45'
  },
});

export default class CheckBox extends Component {
  static defaultProps = {
    label: 'Label',
    labelBefore: false,
    checked: false
  };
  static propTypes = {
    label: React.PropTypes.string,
    labelStyle: React.PropTypes.object,
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  onChange() {
    this.setState({
      checked: !this.state.checked
    });
  }

  toggle() {
    let rescheck = !this.state.checked;
    this.setState({
      checked: rescheck
    });
    this.props.onChange(rescheck);
  }

  render() {
    var source = "square-o";

    if (this.state.checked) {
      source = "check-square-o";
    }

    var container = (
      <View style={styles.container}>
        <Text style={styles.icon} allowFontScaling={false}>{icon(source)}</Text>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, this.props.labelStyle]} allowFontScaling={false}>{this.props.label}</Text>
        </View>
      </View>
    );

    if (this.props.labelBefore) {
      container = (
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, this.props.labelStyle]} allowFontScaling={false}>{this.props.label}</Text>
          </View>
          <Text style={styles.icon} allowFontScaling={false}>{icon(source)}</Text>
        </View>
      );
    }
    if (this.props.label == '') {
      container = (
        <View style={styles.container}>
          <Text style={styles.icon} allowFontScaling={false}>{icon(source)}</Text>
        </View>
      );
    }

    return (
      <TouchableHighlight ref="checkbox" onPress={this.toggle.bind(this)} underlayColor='#ffffff'>
        {container}
      </TouchableHighlight>
    )
  }
};