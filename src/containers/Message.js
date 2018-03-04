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
  Dimensions,
  ListView
} from 'react-native';
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
import icon from '../constants/iconfont.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  funcbutton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
  },
  leftview: {
    flex: 0,
    width: 40,
    paddingLeft: 10,
    paddingTop: 10
  },
  leftimg: {
    fontFamily: 'iconfont',
    fontSize: 22,
    color: '#d4d4d4',
  },
  leftaweimg: {
    fontFamily: 'fontawesome',
    fontSize: 22,
    color: '#d4d4d4',
  },
  context: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
    paddingRight: 20,
    marginLeft: 10
  },
  funcText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#d4d4d4',
  }
});

class Message extends Component {
  constructor(props) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  componentWillMount() {
    const {
      actions,
      auth
    } = this.props;
    actions.linkman(auth.token.access_token,auth.info.api);
  }

  getMessage(rowData) {
    if (rowData.Id) {
      Actions.Comment({
        linkman: rowData
      });
    }
  }
  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData.Type == 'EnterpriseMessages') {
      return (
        <TouchableOpacity onPress={()=>{this.getMessage(rowData)}} style={styles.funcbutton}>
          <View style={styles.leftview}>
            <Text style={[styles.leftimg,{color:'#FE8F45'}]} allowFontScaling={false}>
              {icon('home')}
            </Text>
          </View>
          <View style={styles.context}>
            <Text style={styles.funcText} allowFontScaling={false}>{rowData.Name}</Text>
            <Text style={styles.icon} allowFontScaling={false}>
              {icon('qiehuanqiyou')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (rowData.Type == 'DeptMessages') {
      return (
        <TouchableOpacity onPress={()=>{this.getMessage(rowData)}} style={styles.funcbutton}>
          <View style={styles.leftview}>
            <Text style={[styles.leftaweimg,{color:'#FE6601'}]} allowFontScaling={false}>
              {icon('cubes')}
            </Text>
          </View>
          <View style={styles.context}>
            <Text style={styles.funcText} allowFontScaling={false}>{rowData.Name}</Text>
            <Text style={styles.icon} allowFontScaling={false}>
              {icon('qiehuanqiyou')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (rowData.Type == 'WhMessages') {
      return (
        <TouchableOpacity onPress={()=>{this.getMessage(rowData)}} style={styles.funcbutton}>
          <View style={styles.leftview}>
            <Text style={[styles.leftaweimg,{color:'#BC4B01'}]} allowFontScaling={false}>
              {icon('cube')}
            </Text>
          </View>
          <View style={styles.context}>
            <Text style={styles.funcText} allowFontScaling={false}>{rowData.Name}</Text>
            <Text style={styles.icon} allowFontScaling={false}>
              {icon('qiehuanqiyou')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={()=>{this.getMessage(rowData)}} style={styles.funcbutton}>
          <View style={styles.leftview}>
            <Text style={[styles.leftimg,{color:'#8B3801'}]} allowFontScaling={false}>
              {icon('yonghu')}
            </Text>
          </View>
          <View style={styles.context}>
            <Text style={styles.funcText} allowFontScaling={false}>{rowData.Name}</Text>
            <Text style={styles.icon} allowFontScaling={false}>
              {icon('qiehuanqiyou')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  render() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let dataSource = ds.cloneWithRows([{}]);
    if (this.props.message && this.props.message.linkmans) {
      dataSource = ds.cloneWithRows(this.props.message.linkmans);
    }
    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource} enableEmptySections={true}
          renderRow={ this.renderRow }
          initialListSize={12}
          pageSize={12}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Message);