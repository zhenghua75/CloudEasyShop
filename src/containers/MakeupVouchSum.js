import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  RecyclerViewBackedScrollView,
  RefreshControl,
  Alert,
  TouchableHighlight
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
  Actions,
  ActionConst
} from 'react-native-router-flux';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  tab: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FE8F45'
  },
  tabitem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca'
  },
  tabitemtitle: {
    fontSize: 14,
    padding: 10
  },
  lists: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10
  },
  verticalLine: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: '#cacaca'
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  emptyrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10
  },
  topview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sn: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#000'
  },
  icon: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#FE8F45',
    paddingLeft: 20
  },
  midview: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 1,
  },
  textlarge: {
    fontSize: 16,
  },
  horizontalLine: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ccc',
  },
  bottomview: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10
  },
  emptyicon: {
    fontFamily: 'iconfont',
    fontSize: 50,
    color: '#a9a9a9',
    marginTop: 20,
  },
  emptytext: {
    marginTop: 20,
    fontSize: 20
  },
  modallay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalinner: {
    borderRadius: 2,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    margin: 22
  },
  inputdiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft:20
  },
  modalitem: {
    fontSize: 16,
    padding: 10,
    color: 'black'
  },
  modalopaplace: {
    flex: 1
  },
  inputblocktop: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5,
    height:48
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
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FE8F45',
    padding: 8,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
  },
  detailtext: {
    fontSize: 14,
    color: 'gray'
  }
});

var CheckBoxData = [];

class MakeupVouchSum extends Component {
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
      vouchdate: strday
    }
    this.renderRow = this.renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillMount() {
    Actions.refresh({
      title: '叫货汇总',
      onBack: () => Actions.MakeupProdinReadVouch({
        vouchId: this.props.vouchId,
        vouchType: '014',
        type: ActionConst.REPLACE
      })
    });
  }

  componentDidMount() {
    this._onRefresh();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _onRefresh() {
    this.timer = setTimeout(() => {
      const {
        actions,
        auth
      } = this.props;
      let reqdata = {
        draw: 1,
        columns: [{
          data: 'VouchLink.SourceId',
          name: '',
          searchable: true,
          orderable: true,
          search: {
            value: '=' + this.props.vouchId,
            regex: false
          }
        }],
        order: [{
          column: 0,
          dir: 'asc'
        }],
        start: 0,
        length: -1,
        search: {
          value: '',
          regex: false
        }
      };
      actions.getVouchLink(auth.token.access_token, reqdata,auth.info.api);
    }, 500);
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData && rowData.DT_RowId) {
      return (
        <View style={[styles.row]}>
          <View style={styles.topview}>
            <Text style={styles.sn} allowFontScaling={false}>{rowData.Vouch.Code}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.midview}>
            <Text style={styles.detailtext} allowFontScaling={false}>叫货仓：{rowData.Warehouse.Name}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>制单人：{rowData.Users.FullName}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.bottomview}>
            <Text style={styles.detailtext} allowFontScaling={false}>{rowData.Vouch.MakeTime}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.emptyrow}>
          <Text style={styles.emptyicon} allowFontScaling={false}>
            {icon('tishi')}
          </Text>
          <Text style={styles.emptytext} allowFontScaling={false}>暂无相关单据</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {
      actions,
      auth,
      profile,
      myVouch
    } = this.props;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let dataSource = ds.cloneWithRows([]);
    if (myVouch['012001'].vouch && myVouch['012001'].vouch.data && myVouch['012001'].vouch.data.length > 0) {
      dataSource = ds.cloneWithRows(myVouch['012001'].vouch.data);
    } else if (myVouch['012001'].vouch) {
      dataSource = ds.cloneWithRows([{}]);
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputblocktop}>
          <Text style={styles.labelinp} allowFontScaling={false}>
            生产仓库
          </Text>
          <View style={styles.inputdiv}>
            <Text style={styles.textinfo} allowFontScaling={false}>{profile.user.whName}</Text>
          </View>
        </View>
        <View style={styles.lists}>
          <ListView
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={ this.renderRow }
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            initialListSize={5}
            pageSize={5}
            refreshControl={
              <RefreshControl
                refreshing={myVouch['012001'].isFetching}
                onRefresh = {
                  this._onRefresh
                }
                tintColor="#7BBFEA"
                title="加载中..."
                titleColor="#7BBFEA"
                colors={['#FE8F45', '#FFA500', '#8B00FF']}
                progressBackgroundColor="#F5F4F4" />
            }
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeupVouchSum);