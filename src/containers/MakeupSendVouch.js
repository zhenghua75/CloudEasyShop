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
	rowgray: {
		flex: 1,
		justifyContent: 'flex-start',
		marginBottom: 10,
		backgroundColor: '#E8E8E8',
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
  detailtext: {
    fontSize: 14,
    color: '#000000'
  }
});

class MakeupSendVouch extends Component {
	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
	}

	componentWillMount() {
		Actions.refresh({
			title: '调拨单',
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
		const {
			actions,
			auth
		} = this.props;
		this.timer = setTimeout(() => {
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
				}, {
					data: 'TransVouch.IsVerify',
					name: '',
					searchable: true,
					orderable: true,
					search: {
						value: '',
						regex: false
					}
				}, {
					data: 'Vouch.MakeTime',
					name: '',
					searchable: true,
					orderable: true,
					search: {
						value: '',
						regex: false
					}
				}],
				order: [{
					column: 1,
					dir: 'asc'
				}, {
					column: 2,
					dir: 'desc'
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
			if (rowData.TransVouch.IsVerify == false) {
				return (
					<TouchableOpacity style={[styles.rowgray]} onPress={()=>{Actions.ReadVouch({vouchId:rowData.TransVouch.Id,vouchType:'009001',sourceId:rowData.VouchLink.SourceId})}}>
	        <View style={styles.topview}>
	          <Text style={styles.sn} allowFontScaling={false}>{rowData.TransVouch.Code}</Text>
	        </View>
	        <View style={styles.horizontalLine} />
	        <View style={styles.midview}>
	        	<Text style={styles.detailtext} allowFontScaling={false}>叫货单号：{rowData.Vouch.Code}</Text>
	          <Text style={styles.detailtext} allowFontScaling={false}>收货仓：{rowData.Warehouse.Name}</Text>
	          <Text style={styles.detailtext} allowFontScaling={false}>制单人：{rowData.Users.FullName}</Text>
	        </View>
	        <View style={styles.horizontalLine} />
	        <View style={styles.bottomview}>
	          <Text style={styles.detailtext} allowFontScaling={false}>{rowData.Vouch.MakeTime}</Text>
	        </View>
	      </TouchableOpacity>
				);
			} else {
				return (
					<TouchableOpacity style={[styles.row]} onPress={()=>{Actions.ReadVerifyVouch({vouchId:rowData.TransVouch.Id,vouchType:'009001',sourceId:rowData.VouchLink.SourceId})}}>
	        <View style={styles.topview}>
	          <Text style={styles.sn} allowFontScaling={false}>{rowData.TransVouch.Code}</Text>
	          <Text style={styles.icon} allowFontScaling={false}>
	            {icon('dui')}
	          </Text>
	        </View>
	        <View style={styles.horizontalLine} />
	        <View style={styles.midview}>
	        	<Text style={styles.detailtext} allowFontScaling={false}>叫货单号：{rowData.Vouch.Code}</Text>
	          <Text style={styles.detailtext} allowFontScaling={false}>收货仓：{rowData.Warehouse.Name}</Text>
	          <Text style={styles.detailtext} allowFontScaling={false}>制单人：{rowData.Users.FullName}</Text>
	        </View>
	        <View style={styles.horizontalLine} />
	        <View style={styles.bottomview}>
	          <Text style={styles.detailtext} allowFontScaling={false}>{rowData.Vouch.MakeTime}</Text>
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
		if (myVouch['012001'].vouch && myVouch['012001'].vouch.data && myVouch['012001'].vouch.data.length > 0) {
			dataSource = ds.cloneWithRows(myVouch['012001'].vouch.data);
		} else if (myVouch['012001'].vouch) {
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeupSendVouch);