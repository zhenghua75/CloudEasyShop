import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableOpacity,
  RecyclerViewBackedScrollView,
  Platform
} from 'react-native';
import icon from '../constants/iconfont.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: Platform.OS=='ios' ? 20 : 0,
    backgroundColor: '#F4F4F4'
  },
  navbar: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    height: 48,
    borderColor: '#cacaca',
    borderBottomWidth: 0.5
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#FE8F45',
    paddingLeft: 10
  },
  textinp: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#F4F4F4',
    paddingLeft:11
  },
  lists: {
    flex: 1,
    justifyContent: 'flex-start',
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
  item: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff'
  },
  itemtext: {
    flex:1,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black'
  },
  itemview: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    borderBottomWidth: 0.5,
    borderColor: '#cacaca',
  },
  invtype: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  buttonview: {
    flex: 1,
    alignItems: 'center'
  },
  invtypebutton: {
    flex: 0,
    backgroundColor: '#FF9966',
    borderWidth: 0.5,
    borderColor: '#FF5809',
    borderRadius: 4
  },
  bttext: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ffffff'
  },
  selitemtext:{
    color:'#FE8F45',
    fontWeight:'bold'
  },
  selitemicon:{
    fontFamily: 'iconfont',
    fontSize: 20,
    color: '#FE8F45',
    paddingRight:10
  }
});

export default class InventoryPickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selinvtype: 0,
      searchinput: ''
    }
    this.renderRow = this.renderRow.bind(this);
    this.setInvType = this.setInvType.bind(this);
  }

  setInvType(invtype) {
    if (invtype == this.state.selinvtype) {
      this.setState({
        selinvtype: 0
      });
    } else {
      this.setState({
        selinvtype: invtype
      });
    }
  }

  selectInvItem(invid) {
    if (invid == '0') {
      this.props.onValueChange(this.props.value);
    } else if (invid != '') {
      this.props.onValueChange(invid);
    }
  }

  componentWillMount() {
    if(this.props.vouchType==='016' && this.props.busType==='023'){
      this.setState({
        selinvtype: 2
      });
    }else if(this.props.vouchType==='016' && this.props.busType==='024'){
      this.setState({
        selinvtype: 3
      });
    }else if(this.props.vouchType==='016' && this.props.busType==='025'){
      this.setState({
        selinvtype: 1
      });
    }
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowData) {
      if (rowData.value == this.props.value) {
        return (
          <TouchableOpacity style={styles.item} onPress={()=>this.selectInvItem(rowData.value)}>
            <View style={styles.itemview}>
              <Text style={[styles.itemtext,styles.selitemtext]} allowFontScaling={false}>{rowData.label.Name}</Text>
              <Text style={styles.selitemicon} allowFontScaling={false}>
                {icon('dui')}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.item} onPress={()=>this.selectInvItem(rowData.value)}>
            <View style={styles.itemview}>
              <Text style={styles.itemtext} allowFontScaling={false}>{rowData.label.Name}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <TouchableOpacity style={styles.emptyrow}>
          <Text style={styles.emptyicon} allowFontScaling={false}>
            {icon('tishi')}
          </Text>
          <Text style={styles.emptytext} allowFontScaling={false}>暂无相关数据</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {
      vouchs,
      value
    } = this.props;

    var btninvtype1 = {
      backgroundColor: this.state.selinvtype == 1 ? '#FE8F45' : '#FF9966'
    };
    var btninvtype2 = {
      backgroundColor: this.state.selinvtype == 2 ? '#FE8F45' : '#FF9966'
    };
    var btninvtype3 = {
      backgroundColor: this.state.selinvtype == 3 ? '#FE8F45' : '#FF9966'
    };

    var btninvtypedisable1=false;
    var btninvtypedisable2=false;
    var btninvtypedisable3=false;

    if(this.props.vouchType==='016' && this.props.busType==='023'){
      btninvtype1 = {
        backgroundColor: '#cacaca',
        borderColor: '#cacaca'
      };
      btninvtype3 = {
        backgroundColor: '#cacaca',
        borderColor: '#cacaca'
      };
      btninvtypedisable1=true;
      btninvtypedisable2=true;
      btninvtypedisable3=true;
    }else if(this.props.vouchType==='016' && this.props.busType==='024'){
      btninvtype1 = {
        backgroundColor: '#cacaca',
        borderColor: '#cacaca'
      };
      btninvtype2 = {
        backgroundColor: '#cacaca',
        borderColor: '#cacaca'
      };
      btninvtypedisable1=true;
      btninvtypedisable2=true;
      btninvtypedisable3=true;
    }else if(this.props.vouchType==='016' && this.props.busType==='025'){
      btninvtype2 = {
        backgroundColor: '#cacaca',
        borderColor: '#cacaca'
      };
      btninvtype3 = {
        backgroundColor: '#cacaca',
        borderColor: '#cacaca'
      };
      btninvtypedisable1=true;
      btninvtypedisable2=true;
      btninvtypedisable3=true;
    }

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let dataSource = ds.cloneWithRows([]);
    let invopt = [];
    if (this.props.optionInvKey) {
      if (vouchs && vouchs.options && vouchs.options[this.props.optionInvKey]) {
        invopt = vouchs.options[this.props.optionInvKey];
      }
    } else {
      if (vouchs && vouchs.options && vouchs.options['Vouchs.InvId']) {
        invopt = vouchs.options['Vouchs.InvId'];
      }
    }
    if (invopt.length > 0) {
      if (this.state.selinvtype == 0 && this.props.vouchType!=='016') {
        if (this.state.searchinput == '') {
          dataSource = ds.cloneWithRows(invopt);
        } else {
          let arrinvtmp = [];
          let searchlowervalue = this.state.searchinput.toLowerCase();
          for (var i in invopt) {
            let lowercode = invopt[i].label.Code.toLowerCase();
            let lowername = invopt[i].label.Name.toLowerCase();
            if (lowercode.includes(searchlowervalue) || lowername.includes(searchlowervalue)) {
              arrinvtmp.push(invopt[i]);
            }
          }
          dataSource = ds.cloneWithRows(arrinvtmp);
        }
      } else {
        let arrinvtmp = [];
        let arrinvtmp1 = [];
        let arrycl = ['QTZL', 'mjl', 'BC', 'YCL', 'stck'];
        if (this.state.selinvtype == 1) {
          for (var i in invopt) {
            if (arrycl.includes(invopt[i].label.CategoryCode)) {
              arrinvtmp.push(invopt[i]);
            }
          }
        } else if (this.state.selinvtype == 2) {
          for (var i in invopt) {
            if (invopt[i].label.CategoryCode != 'bcp' && !arrycl.includes(invopt[i].label.CategoryCode)) {
              arrinvtmp.push(invopt[i]);
            }
          }
        } else if (this.state.selinvtype == 3) {
          for (var i in invopt) {
            if (invopt[i].label.CategoryCode == 'bcp') {
              arrinvtmp.push(invopt[i]);
            }
          }
        }
        if (this.state.searchinput == '') {
          arrinvtmp1 = arrinvtmp;
        } else {
          let searchlowervalue = this.state.searchinput.toLowerCase();
          for (var i in arrinvtmp) {
            let lowercode = arrinvtmp[i].label.Code.toLowerCase();
            let lowername = arrinvtmp[i].label.Name.toLowerCase();
            if (lowercode.includes(searchlowervalue) || lowername.includes(searchlowervalue)) {
              arrinvtmp1.push(arrinvtmp[i]);
            }
          }
        }
        dataSource = ds.cloneWithRows(arrinvtmp1);
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={()=>this.selectInvItem('0')}>
            <Text style={styles.icon} allowFontScaling={false}>
              {icon('qiehuanqizuo')}返回
            </Text>
          </TouchableOpacity>
          <TextInput style={styles.textinp} placeholder='请输入存货编码或名称' underlineColorAndroid='transparent'
            onChangeText={(text) => {this.setState({searchinput: text.replace(/\s/g, '')});}}>
          </TextInput>
        </View>
        <View style={styles.invtype}>
          <View style={styles.buttonview}>
            <TouchableOpacity style={[styles.invtypebutton,btninvtype1]} disabled={btninvtypedisable1} onPress={()=>this.setInvType(1)}>
              <Text style={styles.bttext} allowFontScaling={false}>原材料</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonview}>
            <TouchableOpacity style={[styles.invtypebutton,btninvtype2]} disabled={btninvtypedisable2} onPress={()=>this.setInvType(2)}>
              <Text style={styles.bttext} allowFontScaling={false}>成品</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonview}>
            <TouchableOpacity style={[styles.invtypebutton,btninvtype3]} disabled={btninvtypedisable3} onPress={()=>this.setInvType(3)}>
              <Text style={styles.bttext} allowFontScaling={false}>半成品</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lists}>
          <ListView
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={ this.renderRow }
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            initialListSize={10}
            pageSize={10}
          />
        </View>
      </View>
    );
  }
}