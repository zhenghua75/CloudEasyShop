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
	Alert
} from 'react-native';

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
		flex: 0,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		borderBottomWidth: 0.5,
		borderColor: '#cacaca',
	},
	modalitem: {
		fontSize: 16,
		padding: 10,
		color: 'black'
	},
	modalopaplace: {
		flex: 1
	},
	iconnav: {
		alignSelf: 'center',
		fontFamily: 'iconfont',
		fontSize: 16,
		color: '#FE8F45',
		paddingLeft: 20,
		paddingRight: 20
	},
	iconview: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignSelf: 'flex-end',
	},
  detailtext: {
    fontSize: 14,
    color: 'gray'
  }
});

class MakeupProdinVouch extends Component {
	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.delVouch = this.delVouch.bind(this);
		this.getRightButton = this.getRightButton.bind(this);
	}

	delVouch(delvid, delcode) {
		if (delvid == '' || delvid == '0' || delcode == '' || delcode == '0') {
			Alert.alert('错误提示', '未选中任何叫货单', [{
				text: '确定'
			}]);
		} else {
			const {
				actions,
				auth
			} = this.props;
			let alertmsg = '是否确认要删除叫货单：\n' + delcode;
			Alert.alert('请确认', alertmsg, [{
				text: '取消',
				onPress: () => {
					//console.log('cancel!');
				}
			}, {
				text: '确认',
				onPress: () => {
					let rowId = 'row_' + delvid;
					let data = {
						action: 'remove',
						data: {}
					};
					data.data[rowId] = {
						DT_RowId: rowId,
						Vouch: {
							VouchType: '006'
						}
					};
					actions.vouch(auth.token.access_token, '006', data,auth.info.api);
					this._onRefresh();
				}
			}]);
		}
	}

	componentDidMount() {
		this._onRefresh();
	}

	getRightButton() {
		return (
			<TouchableOpacity style={styles.iconview} onPress={() => Actions.ProdinVouchAdd({sourceId:this.props.vouchId})}>
        <Text style={styles.iconnav} allowFontScaling={false}>{icon('tianjia')}</Text>
      </TouchableOpacity>
		);
	}

	componentWillMount() {
		Actions.refresh({
			title: '产成品入库单',
			onBack: () => Actions.MakeupProdinReadVouch({
				vouchId: this.props.vouchId,
				vouchType: '014',
				type: ActionConst.REPLACE
			}),
			renderRightButton: () => this.getRightButton()
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		isupdate = false;
		var map1 = Immutable.fromJS(nextProps.myVouch['006001']);
		var map2 = Immutable.fromJS(this.props.myVouch['006001']);
		if (Immutable.is(map1, map2)) {
			isupdate = false;
		} else {
			isupdate = true;
		}
		if (!isupdate) {
			map1 = Immutable.fromJS(nextState);
			map2 = Immutable.fromJS(this.state);
			if (Immutable.is(map1, map2)) {
				isupdate = false;
			} else {
				isupdate = true;
			}
		}
		return isupdate;
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
			actions.getVouch(auth.token.access_token, {
				VouchType: '006001',
				IsVerify: false,
				VouchDate: '',
				SourceId: this.props.vouchId
			},auth.info.api);
		}, 500);
	}

	renderRow(rowData, sectionID, rowID, highlightRow) {
		if (rowData && rowData.Sn) {
			if (rowData.IsVerify == false) {
				return (
					<TouchableOpacity style={[styles.row]} onPress={()=>{Actions.ReadVouch({vouchId:rowData.Id,vouchType:'006001'})}}>
          <View style={styles.topview}>
            <Text style={styles.sn} allowFontScaling={false}>{rowData.Code}</Text>
            <TouchableOpacity onPress={()=>this.delVouch(rowData.Id,rowData.Code)}>
              <Text style={styles.icon} allowFontScaling={false}>
                {icon('shanchu')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.midview}>
            <Text style={styles.detailtext} allowFontScaling={false}>生产仓：{rowData.ToWhName}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>制单人：{rowData.FullName}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.bottomview}>
            <Text style={styles.detailtext} allowFontScaling={false}>{rowData.MakeTime}</Text>
          </View>
        </TouchableOpacity>
				);
			} else {
				return (
					<TouchableOpacity style={[styles.row]} onPress={()=>{Actions.ReadVerifyVouch({vouchId:rowData.Id,vouchType:'006001'})}}>
          <View style={styles.topview}>
            <Text style={styles.sn} allowFontScaling={false}>{rowData.Code}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.midview}>
            <Text style={styles.detailtext} allowFontScaling={false}>生产仓：{rowData.ToWhName}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>制单人：{rowData.FullName}</Text>
            <Text style={styles.detailtext} allowFontScaling={false}>生产审核人：{rowData.VerifyFullName}</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.bottomview}>
            <Text style={styles.detailtext} allowFontScaling={false}>{rowData.MakeTime}</Text>
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
          <Text style={styles.emptytext} allowFontScaling={false}>暂无相关单据</Text>
        </TouchableOpacity>
			);
		}
	}

	render() {
		const {
			myVouch
		} = this.props;

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		let dataSource = ds.cloneWithRows([]);
		if (myVouch['006001'].vouch && myVouch['006001'].vouch.length > 0) {
			dataSource = ds.cloneWithRows(myVouch['006001'].vouch);
		} else if (myVouch['006001'].vouch) {
			dataSource = ds.cloneWithRows([{}]);
		}

		return (
			<View style={styles.container}>
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
                refreshing={myVouch['006001'].isFetching}
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeupProdinVouch);