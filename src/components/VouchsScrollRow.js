import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert
} from 'react-native';

import icon from '../constants/iconfont.js';
import {
  Actions
} from 'react-native-router-flux';

const styles = StyleSheet.create({
  vouchsitem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 10
  },
  horizontalLine: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#cacaca',
  },
  contview: {
    flex: 1,
    flexDirection: 'row',
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
  invitembutton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  invitemleft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 10
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
  }
});

export default class VouchsScrollRow extends Component {
  constructor(props) {
    super(props);
    this.delVouchs = this.delVouchs.bind(this);
  }

  delVouchs() {
    const {
      vouchs,
      actions,
      auth
    } = this.props;
    let alertmsg = '是否确认要删除：\n' + vouchs.Inventory.Name;
    Alert.alert('请确认', alertmsg, [{
      text: '取消',
      onPress: () => {}
    }, {
      text: '确认',
      onPress: () => {
        let rowId = vouchs.DT_RowId;
        let data = {
          action: 'remove',
          data: {}
        };
        data.data[rowId] = {
          DT_RowId: rowId,
          Vouchs: {
            InvId: vouchs.Vouchs.InvId,
            VouchId: vouchs.Vouchs.VouchId
          }
        };
        actions.vouchs(auth.token.access_token, data,auth.info.api);
      }
    }]);
  }

  render() {
    const {
      vouchs
    } = this.props;

    let maxwidth = Dimensions.get('window').width;
    let invwidth = Math.round((maxwidth - 30) * 0.5);
    let specswidth = Math.round((maxwidth - 30) * 0.3);
    let numwidth = Math.round((maxwidth - 30) * 0.2);
    let invnamefirst = vouchs.Inventory.Name.substr(0, 1);
    let charline = '|';
    let specsname = vouchs.Inventory.Specs == null ? '-' : vouchs.Inventory.Specs;

    if (this.props.vouchType == '012' || this.props.vouchType == '014') {
      if (this.props.isVerify) {
        return (
          <View style={styles.invitem}>
            <View style={styles.leftview}>
              <View style={styles.leftcircyle}>
                <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
              </View>
            </View>
            <View style={styles.midview}>
              <View style={styles.middetailview}>
                <Text style={styles.midspec} allowFontScaling={false}>{specsname}</Text>
              </View>
              <View style={styles.midtitlelview}>
                <Text style={styles.midtitle} allowFontScaling={false}>{vouchs.Inventory.Name}</Text>
              </View>
            </View>
            <View style={styles.rightview}>
              <View style={styles.rightviewrow}>
                <Text style={[styles.numtext,{alignSelf:'center'}]} allowFontScaling={false}>{vouchs.Vouchs.Num}</Text>
                <Text style={[styles.unittext,{alignSelf:'center'}]} allowFontScaling={false}>{vouchs.UOM.Name}</Text>
              </View>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.invitembutton}>
            <TouchableOpacity style={styles.invitemleft} onPress={()=>Actions.VouchsEdit({vouchsid:vouchs.DT_RowId.substr(4),vouchType:this.props.vouchType})}>
              <View style={styles.leftview}>
                <View style={styles.leftcircyle}>
                  <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                </View>
              </View>
              <View style={styles.midview}>
                <View style={styles.middetailview}>
                  <Text style={styles.midspec} allowFontScaling={false}>{specsname}</Text>
                </View>
                <View style={styles.midtitlelview}>
                  <Text style={styles.midtitle} allowFontScaling={false}>{vouchs.Inventory.Name}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.invitemright} onPress={()=>this.delVouchs()}>
              <View style={styles.rightviewrowright}>
                <Text style={styles.icon} allowFontScaling={false}>
                  {icon('close')}
                </Text>
              </View>
              <View style={styles.rightviewrow}>
                <Text style={styles.numtext} allowFontScaling={false}>{vouchs.Vouchs.Num}</Text>
                <Text style={styles.unittext} allowFontScaling={false}>{vouchs.UOM.Name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      if (this.props.isVerify) {
        return (
          <View style={styles.invitem}>
            <View style={styles.leftview}>
              <View style={styles.leftcircyle}>
                <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
              </View>
            </View>
            <View style={styles.midview}>
              <View style={styles.middetailview}>
                <Text style={styles.midspec} allowFontScaling={false}>{vouchs.Inventory.Specs}</Text>
                <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{vouchs.Vouchs.Batch}</Text>
              </View>
              <View style={styles.midtitlelview}>
                <Text style={styles.midtitle} allowFontScaling={false}>{vouchs.Inventory.Name}</Text>
              </View>
              <View style={styles.middetailviewright}>
                <Text style={styles.textinfobatch} allowFontScaling={false}>{vouchs.Vouchs.MadeDate} |</Text>
                <Text style={styles.textinfobatch} allowFontScaling={false}> {vouchs.Vouchs.InvalidDate}</Text>
              </View>
            </View>
            <View style={styles.rightview}>
              <View style={styles.rightviewrow}>
                <Text style={styles.numtext} allowFontScaling={false}>{vouchs.Vouchs.Num}</Text>
                <Text style={styles.unittext} allowFontScaling={false}>{vouchs.UOM.Name}x{vouchs.Vouchs.Price}</Text>
              </View>
              <View style={styles.rightviewrowright}>
                <Text style={styles.amounttext} allowFontScaling={false}>{vouchs.Vouchs.Amount}</Text>
              </View>
            </View>
          </View>
        );
      } else {
        if (this.props.vouchType == '003') {
          return (
            <View style={styles.invitem}>
              <View style={styles.leftview}>
                <View style={styles.leftcircyle}>
                  <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                </View>
              </View>
              <View style={styles.midview}>
                <View style={styles.middetailview}>
                  <Text style={styles.midspec} allowFontScaling={false}>{vouchs.Inventory.Specs}</Text>
                  <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{vouchs.Vouchs.Batch}</Text>
                </View>
                <View style={styles.middetailview}>
                  <Text style={styles.midtitle} allowFontScaling={false}>{vouchs.Inventory.Name}</Text>
                </View>
                <View style={styles.middetailviewright}>
                  <Text style={styles.textinfobatch} allowFontScaling={false}>{vouchs.Vouchs.MadeDate} |</Text>
                  <Text style={styles.textinfobatch} allowFontScaling={false}> {vouchs.Vouchs.InvalidDate}</Text>
                </View>
              </View>
              <View style={styles.rightview}>
                <View style={styles.rightviewrow}>
                  <Text style={styles.numtext} allowFontScaling={false}>{vouchs.Vouchs.Num}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{vouchs.UOM.Name}x{vouchs.Vouchs.Price}</Text>
                </View>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.amounttext} allowFontScaling={false}>{vouchs.Vouchs.Amount}</Text>
                </View>
              </View>
            </View>
          );
        } else if (this.props.vouchType == '006' || this.props.vouchType == '001') {
          return (
            <View style={styles.invitembutton}>
              <TouchableOpacity style={styles.invitemleft} onPress={()=>Actions.VouchsEditExIn({vouchsid:vouchs.DT_RowId.substr(4),vouchType:this.props.vouchType})}>
                <View style={styles.leftview}>
                  <View style={styles.leftcircyle}>
                    <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                  </View>
                </View>
                <View style={styles.midview}>
                  <View style={styles.middetailview}>
                    <Text style={styles.midspec} allowFontScaling={false}>{vouchs.Inventory.Specs}</Text>
                    <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{vouchs.Vouchs.Batch}</Text>
                  </View>
                  <View style={styles.midtitlelview}>
                    <Text style={styles.midtitle} allowFontScaling={false}>{vouchs.Inventory.Name}</Text>
                  </View>
                  <View style={styles.middetailviewright}>
                    <Text style={styles.textinfobatch} allowFontScaling={false}>{vouchs.Vouchs.MadeDate} |</Text>
                    <Text style={styles.textinfobatch} allowFontScaling={false}> {vouchs.Vouchs.InvalidDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.invitemright} onPress={()=>this.delVouchs()}>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.icon} allowFontScaling={false}>
                    {icon('close')}
                  </Text>
                </View>
                <View style={styles.rightviewrow}>
                  <Text style={styles.numtext} allowFontScaling={false}>{vouchs.Vouchs.Num}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{vouchs.UOM.Name}x{vouchs.Vouchs.Price}</Text>
                </View>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.amounttext} allowFontScaling={false}>{vouchs.Vouchs.Amount}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        } else {
          if (vouchs.Vouchs.Batch) {
            return (
              <View style={styles.invitembutton}>
                <TouchableOpacity style={styles.invitemleft} onPress={()=>Actions.VouchsEditEx({vouchsid:vouchs.DT_RowId.substr(4),vouchType:this.props.vouchType})}>
                  <View style={styles.leftview}>
                    <View style={styles.leftcircyle}>
                      <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                    </View>
                  </View>
                  <View style={styles.midview}>
                    <View style={styles.middetailview}>
                      <Text style={styles.midspec} allowFontScaling={false}>{vouchs.Inventory.Specs}</Text>
                      <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{vouchs.Vouchs.Batch}</Text>
                    </View>
                    <View style={styles.midtitlelview}>
                      <Text style={styles.midtitle} allowFontScaling={false}>{vouchs.Inventory.Name}</Text>
                    </View>
                    <View style={styles.middetailviewright}>
                      <Text style={styles.textinfobatch} allowFontScaling={false}>{vouchs.Vouchs.MadeDate} |</Text>
                      <Text style={styles.textinfobatch} allowFontScaling={false}> {vouchs.Vouchs.InvalidDate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.invitemright} onPress={()=>this.delVouchs()}>
                  <View style={styles.rightviewrowright}>
                    <Text style={styles.icon} allowFontScaling={false}>
                      {icon('close')}
                    </Text>
                  </View>
                  <View style={styles.rightviewrow}>
                    <Text style={styles.numtext} allowFontScaling={false}>{vouchs.Vouchs.Num}</Text>
                    <Text style={styles.unittext} allowFontScaling={false}>{vouchs.UOM.Name}x{vouchs.Vouchs.Price}</Text>
                  </View>
                  <View style={styles.rightviewrowright}>
                    <Text style={styles.amounttext} allowFontScaling={false}>{vouchs.Vouchs.Amount}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.invitembutton}>
              <TouchableOpacity style={styles.invitemleft} onPress={()=>Actions.VouchsEditEx({vouchsid:vouchs.DT_RowId.substr(4),vouchType:this.props.vouchType})}>
                <View style={styles.leftview}>
                  <View style={styles.leftcircyle}>
                    <Text style={styles.invnameicon} allowFontScaling={false}>{invnamefirst}</Text>
                  </View>
                </View>
                <View style={styles.midview}>
                  <View style={styles.middetailview}>
                    <Text style={styles.midspec} allowFontScaling={false}>{vouchs.Inventory.Specs}</Text>
                    <Text style={[styles.midspec,{paddingLeft:10}]} allowFontScaling={false}>{vouchs.Vouchs.Batch}</Text>
                  </View>
                  <View style={styles.midtitlelview}>
                    <Text style={styles.midtitle} allowFontScaling={false}>{vouchs.Inventory.Name}</Text>
                  </View>
                  <View style={styles.middetailviewright}>
                    <Text style={styles.textinfobatch} allowFontScaling={false}>-</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.invitemright} onPress={()=>this.delVouchs()}>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.icon} allowFontScaling={false}>
                    {icon('close')}
                  </Text>
                </View>
                <View style={styles.rightviewrow}>
                  <Text style={styles.numtext} allowFontScaling={false}>{vouchs.Vouchs.Num}</Text>
                  <Text style={styles.unittext} allowFontScaling={false}>{vouchs.UOM.Name}x{vouchs.Vouchs.Price}</Text>
                </View>
                <View style={styles.rightviewrowright}>
                  <Text style={styles.amounttext} allowFontScaling={false}>{vouchs.Vouchs.Amount}</Text>
                </View>
              </TouchableOpacity>
            </View>
            );
          }
        }
      }
    }
  }
}