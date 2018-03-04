import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
  Picker,
  Modal,
  ActivityIndicator,
  Dimensions,
  Alert,
  ListView
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
    backgroundColor: '#F4F4F4',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  spinner: {
    justifyContent: 'center',
    paddingTop:2,
    paddingBottom:2
  },
  iconr: {
    position: 'absolute',
    right: 10,
    top: 15,
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
  },
  inputblock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10
  },
  labelinp: {
    fontSize: 16,
    alignSelf: 'center',
    width: 60,
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputdiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  modalselect: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  modalselectvalue: {
    flex: 1,
    paddingLeft: 20,
    color: 'black',
    fontSize:16
  },
  iconmodalselect: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#d4d4d4',
    paddingRight: 10
  },
  iconsearch: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#FE8F45'
  },
  iconbtn: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderColor: '#FE8F45',
    borderWidth: 0.5,
    borderRadius: 14,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  icontext: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 5
  },
  rightview: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  textinfo: {
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000'
  },
  textinfobatch: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  textinfobatchline: {
    fontSize: 12,
    paddingHorizontal: 5
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 14,
    color: '#FE8F45',
  },
  invitem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  leftview: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10
  },
  leftcircyle: {
    backgroundColor: '#FEB381',
    borderWidth: 0.5,
    borderColor: '#FE8F45',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingTop: 2,
    paddingBottom: 3,
  },
  invnameicon: {
    color: '#ffffff'
  },
  midview: {
    flex: 1
  },
  midtitle: {
    fontSize: 16,
    color: '#000000'
  },
  midspec: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  middetailview: {
    flex: 1,
    flexDirection: 'row'
  },
  midtitlelview: {
    flex: 1
  },
  middetailviewright: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  rightview: {
    flex: 0,
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderColor: '#cacaca',
    paddingLeft: 10
  },
  invitemright: {
    flex: 0,
    justifyContent: 'center',
    borderLeftWidth: 0.5,
    borderColor: '#cacaca',
    paddingLeft: 10,
    paddingRight: 10
  },
  numtext: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'flex-end'
  },
  rightviewrow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  rightviewrowright: {
    flex: 1,
    alignItems: 'flex-end'
  },
  unittext: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  amounttext: {
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  searchcond: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
    backgroundColor: '#ffffff',
    paddingBottom: 10
  },
  lists: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  emptyrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10
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
  footerstyle: {
    flex:0,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#EBE4E2'
  },
});

class ReportCurrentStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whid: '',
      invid: '',
      invname: '请选择',
      invmodalshow: false,
      dataSource: null,
      curpage: -1,
      statusCode: 'STATUS_LOADING'
    }
    this._curstockdata = [];
    this.modalSetVisible = this.modalSetVisible.bind(this);
    this.invSelectHandler = this.invSelectHandler.bind(this);
    this.curStockQuery = this.curStockQuery.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.moreCurStock = this.moreCurStock.bind(this);
  }

  modalSetVisible(visible) {
    this.setState({
      invmodalshow: visible
    });
  }

  invSelectHandler(selinvid) {
    const {
      currentStock
    } = this.props;
    if(currentStock.currentStock){
      var options = currentStock.currentStock.options['CurrentStock.InvId'];
      for (var i in options) {
        if (options[i].value == selinvid) {
          this.setState({
            invname: options[i].label.Name,
            invmodalshow: false
          });
          break;
        }
      }
    }
    if (selinvid == '') {
      this.setState({
        invname: '请选择',
        invmodalshow: false
      });
    }
  }

  curStockQuery() {
    const {
      actions,
      auth
    } = this.props;
    if (this.state.whid == null || this.state.whid == '') {
      Alert.alert('提示', '请选择仓库', [{
        text: '确定'
      }]);
    } else {
      this._curstockdata = [];
      this.setState({
        curpage: 0,
        statusCode: 'STATUS_LOADING'
      });
      this.timer = setTimeout(() => {
        this._onRefresh(0);
      }, 300);
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  moreCurStock() {
    const {
      currentStock
    } = this.props;
    if (this.state.statusCode === 'STATUS_NORMAL' && this.state.curpage >= 0 && currentStock.currentStock.recordsFiltered > this._curstockdata.length) {
      this.setState({
        statusCode: 'STATUS_LOADING'
      });
      let newpage = this.state.curpage + 1;
      this.setState({
        curpage: newpage
      });
      this.timer = setTimeout(() => {
        this._onRefresh(newpage);
      }, 300);
    }
  }

  _onRefresh(pageindex) {
    const {
      actions,
      auth,
      currentStock
    } = this.props;
    let reqstart = 0;
    if (pageindex > 0) {
      reqstart = pageindex * 8;
    }
    if (pageindex === 0 || this.state.curpage <= pageindex) {
      if (this.state.whid && !currentStock.isFetching) {
        let data = {
          draw: 1,
          columns: [{
            data: 'CurrentStock.WhId',
            name: '',
            searchable: true,
            orderable: true,
            search: {
              value: '=' + this.state.whid,
              regex: false
            }
          }],
          order: [{
            column: 0,
            dir: 'asc'
          }],
          start: reqstart,
          length: 8,
          search: {
            value: '',
            regex: false
          }
        };
        if (this.state.invid) {
          data.columns.push({
            data: 'CurrentStock.InvId',
            name: '',
            searchable: true,
            orderable: true,
            search: {
              value: '=' + this.state.invid,
              regex: false
            }
          })
        }
        actions.reportCurrentStock(auth.token.access_token, data,auth.info.api);
      } else {
        Toast.show('请选择仓库', {
          position: -60,
          delay: 0,
        });
      }
    }
  }

  componentWillMount() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      dataSource: ds.cloneWithRows([])
    });
  }

  componentDidMount() {
    const {
      actions,
      auth
    } = this.props;
    let data = {
      draw: 1,
      columns: [{
        data: 'CurrentStock.WhId',
        name: '',
        searchable: true,
        orderable: true,
        search: {
          value: '=0',
          regex: false
        }
      }],
      order: [{
        column: 0,
        dir: 'asc'
      }],
      start: 0,
      length: 1,
      search: {
        value: '',
        regex: false
      }
    };
    actions.reportCurrentStock(auth.token.access_token, data,auth.info.api);
  }

  componentWillReceiveProps(nextProps) {
    let currentStock = nextProps.currentStock;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let map1 = Immutable.fromJS(currentStock.currentStock);
    let map2 = Immutable.fromJS(this.props.currentStock.currentStock);
    if (!Immutable.is(map1, map2) && !currentStock.isFetching) {
      this.setState({
        statusCode: 'STATUS_NORMAL'
      });
    } else if (Immutable.is(map1, map2) && !currentStock.isFetching && currentStock.currentStock && currentStock.currentStock.data.length === 0) {
      this.setState({
        statusCode: 'STATUS_NORMAL'
      });
    }

    if (currentStock.currentStock && currentStock.currentStock.data.length > 0) {
      map1 = Immutable.fromJS(currentStock.currentStock.data);
      map2 = Immutable.fromJS(this.props.currentStock.currentStock.data);
      if (!Immutable.is(map1, map2)) {
        var newdatatmp = currentStock.currentStock.data;
        for (var i = 0; i < newdatatmp.length; i++) {
          this._curstockdata.push(newdatatmp[i]);
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this._curstockdata)
        });
      } else if (this._curstockdata.length === 0) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([])
        });
      }
    } else if (!currentStock.isFetching && currentStock.currentStock && currentStock.currentStock.data.length == 0 && this.state.whid) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([{}])
      });
    } else if (this._curstockdata.length === 0) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([])
      });
    }
  }

  renderFooter() {
    const statusCode = this.state.statusCode;
    const {
      currentStock
    } = this.props;
    let footerContext;
    if (statusCode === 'STATUS_NORMAL') {
      if (currentStock.currentStock && currentStock.currentStock.recordsFiltered <= this._curstockdata.length && this._curstockdata.length > 0) {
        footerContext = (
          <View style={styles.footerstyle}>
            <Text style={{color:'#000000',paddingVertical:5}} allowFontScaling={false}>{'已经到底了'}</Text>
          </View>
        );
      } else {
        return null;
      }
    } else if (statusCode === 'STATUS_LOADING') {
      footerContext = (
        <View style={styles.footerstyle}>
          <ActivityIndicator style={styles.spinner} animating={true} size='small' color='#FE8330' />
          <Text style={{color:'#000000',paddingBottom:2}} allowFontScaling={false}>{'加载中...'}</Text>
        </View>
      );
    }

    return footerContext;
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData && rowData.CurrentStock) {
      let invnamefirst = rowData.Inventory.Name.substr(0, 1);
      return (
        <View style={styles.invitem}>
          <View style={styles.leftview}>
            <View style={styles.leftcircyle}>
              <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
            </View>
          </View>
          <View style={styles.midview}>
            <View style={styles.middetailview}>
              <Text style={styles.midspec} allowFontScaling={false}>{rowData.Inventory.Specs}</Text>
              <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{rowData.CurrentStock.Batch}</Text>
            </View>
            <View style={styles.middetailview}>
              <Text style={styles.midtitle} allowFontScaling={false}>{rowData.Inventory.Name}</Text>
            </View>
            <View style={styles.middetailviewright}>
              <Text style={styles.textinfobatch} allowFontScaling={false}>{rowData.CurrentStock.MadeDate} |</Text>
              <Text style={styles.textinfobatch} allowFontScaling={false}> {rowData.CurrentStock.InvalidDate}</Text>
            </View>
          </View>
          <View style={styles.rightview}>
            <View style={styles.rightviewrow}>
              <Text style={styles.numtext} allowFontScaling={false}>{rowData.CurrentStock.Num}</Text>
              <Text style={styles.unittext} allowFontScaling={false}>{rowData.UOM.Name}x{rowData.CurrentStock.Price}</Text>
            </View>
            <View style={styles.rightviewrowright}>
              <Text style={styles.amounttext} allowFontScaling={false}>{rowData.CurrentStock.Amount}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.emptyrow}>
          <Text style={styles.emptyicon} allowFontScaling={false}>
            {icon('tishi')}
          </Text>
          <Text style={styles.emptytext} allowFontScaling={false}>当前仓库无该存货的库存</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {
      actions,
      auth,
      currentStock,
      profile
    } = this.props;

    // if (currentStock.currentStock && currentStock.currentStock.errorinfo) {
    //   Alert.alert('错误提示', currentStock.currentStock.errorinfo, [{
    //     text: '确定'
    //   }]);
    // }

    return (
      <View style={styles.container}>
        <Modal visible={this.state.invmodalshow}
          onRequestClose={()=>{this.modalSetVisible(false)}}>
          <InventoryPickerModal 
            vouchs={currentStock.currentStock} 
            value={this.state.invid}
            optionInvKey='CurrentStock.InvId'
            onValueChange={(invid) => {this.setState({invid: invid});this.invSelectHandler(invid);}} />
        </Modal>
        <View style={styles.searchcond}>
          <View style={styles.inputblock}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              仓库
            </Text>
            <View style={styles.inputdiv}>
              <WareHousePicker
                vouch={currentStock.currentStock}
                value={this.state.whid}
                optionWhKey='CurrentStock.WhId'
                onValueChange={(fwhid) => {this.setState({whid: fwhid});}} />
              <Text style={styles.iconr} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </View>
          </View>
          <View style={styles.inputblock}>
            <Text style={styles.labelinp} allowFontScaling={false}>
              存货
            </Text>
            <TouchableOpacity style={styles.modalselect} onPress={()=>this.modalSetVisible(true)}>
              <Text style={styles.modalselectvalue} allowFontScaling={false}>{this.state.invname}</Text>
              <Text style={styles.iconmodalselect} allowFontScaling={false}>
                {icon('qiehuanqiyou')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.iconbtn} onPress={()=>this.curStockQuery()}>
            <Text style={styles.iconsearch} allowFontScaling={false}>
              {icon('sousuo1')}
            </Text>
            <Text style={styles.icontext} allowFontScaling={false}>查询</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lists}>
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={ this.renderRow }
            onEndReached={this.moreCurStock}
            onEndReachedThreshold={5}
            pageSize={6}
          />
          {this.renderFooter()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportCurrentStock);