import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import * as actions from '../actions';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryview: {
    alignItems:'center',
    bottom:30
  },
  summary: {
    fontSize:16
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      actions
    } = this.props;
    this.timer = setTimeout(() => {
      actions.getEnterpriseInfo();
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    let devwidth = Dimensions.get('window').width;
    let devheight = Dimensions.get('window').height;
    return (
      <View style={styles.container}>
        <Image style={{width:devwidth,height:devheight,justifyContent:'flex-end'}} source={require('../images/start1.jpg')}>
          <View style={styles.summaryview}>
            <Text style={styles.summary} allowFontScaling={false}>云易店©2016 kmdx.cn</Text>
          </View>
        </Image>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);