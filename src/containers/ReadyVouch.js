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
	Actions
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
		backgroundColor: '#fff'
	},
	tabitem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff'
	},
	tabitemtitle: {
		fontSize: 12,
		padding: 10,
		color: 'black',
		paddingTop: 5
	},
	lists: {
		flex: 1,
		justifyContent: 'flex-start',
		marginTop: 10
	},
	verticalLine: {
		width: 2,
		height: 40,
		alignSelf: 'center',
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
	funcicon: {
		fontFamily: 'iconfont',
		fontSize: 30,
		paddingTop: 10
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
	listheader: {
		flex: 1,
		backgroundColor: '#fff',
		borderTopWidth: 0.5,
		borderColor: '#cacaca',
	},
	listheadertitle: {
		color: 'black',
		padding: 5
	},
	detailtext: {
	    fontSize: 14,
	    color: '#000000'
	 }
});

class ReadyVouch extends Component {
	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
	}

	componentDidMount() {
		this._onRefresh();
	}

	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}

	shouldComponentUpdate(nextProps, nextState) {
		isupdate = false;
		var map1 = Immutable.fromJS(nextProps.myVouch['012009']);
		var map2 = Immutable.fromJS(this.props.myVouch['012009']);
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

	_onRefresh() {
		this.timer = setTimeout(() => {
			const {
				actions,
				auth
			} = this.props;
			actions.getVouch(auth.token.access_token, {
				VouchType: '012009',
				IsVerify: true,
				VouchDate: ''
			},auth.info.api);
		}, 500);
	}

	renderHeader() {
		return (
			<View style={styles.listheader}>
				<Text style={styles.listheadertitle} allowFontScaling={false}>待处理的叫货单</Text>
			</View>
		);
	}

	renderRow(rowData, sectionID, rowID, highlightRow) {
		if (rowData && rowData.Sn) {
			return (
				<TouchableOpacity style={[styles.row]} onPress={()=>{Actions.ReadVerifyVouch({vouchId:rowData.Id,vouchType:'012',readOnly:true})}}>
        <View style={styles.topview}>
          <Text style={styles.sn} allowFontScaling={false}>{rowData.Code}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.midview}>
          <Text style={styles.detailtext} allowFontScaling={false}>叫货仓：{rowData.ToWhName}</Text>
          <Text style={styles.detailtext} allowFontScaling={false}>发货仓：{rowData.FromWhName}</Text>
          <Text style={styles.detailtext} allowFontScaling={false}>叫货人：{rowData.FullName}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.bottomview}>
          <Text style={styles.detailtext} allowFontScaling={false}>{rowData.MakeTime}</Text>
        </View>
      </TouchableOpacity>
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
			myVouch
		} = this.props;

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		let dataSource = ds.cloneWithRows([]);
		if(myVouch && myVouch['012009']){
			if (myVouch['012009'].vouch && myVouch['012009'].vouch.length > 0) {
				dataSource = ds.cloneWithRows(myVouch['012009'].vouch);
			} else if (myVouch['012009'].vouch) {
				dataSource = ds.cloneWithRows([{}]);
			}
		}
		
		return (
			<View style={styles.container}>
				<View style={styles.tab}>
		          <TouchableOpacity style={styles.tabitem} 
		            onPress={()=>{Actions.MakeupVouch()}}>
			          <Text style={[styles.funcicon,{color:'#FF0033'}]} allowFontScaling={false}>
			            {icon('rizhi')}
			          </Text>
		            <Text style={styles.tabitemtitle} allowFontScaling={false}>生产计划</Text>
		          </TouchableOpacity>
		          <View style={styles.verticalLine} />
		          <TouchableOpacity style={styles.tabitem}
		            onPress={()=>{Actions.ProdinVouch()}}>
			          <Text style={[styles.funcicon,{color:'#FFCC33'}]} allowFontScaling={false}>
			            {icon('shangpin')}
			          </Text>
		            <Text style={styles.tabitemtitle} allowFontScaling={false}>产成品入库</Text>
		          </TouchableOpacity>
		          <View style={styles.verticalLine} />
		          <TouchableOpacity style={styles.tabitem}
		            onPress={()=>{Actions.PchinVouch()}}>
			          <Text style={[styles.funcicon,{color:'#003366'}]} allowFontScaling={false}>
			            {icon('gouwuche')}
			          </Text>
		            <Text style={styles.tabitemtitle} allowFontScaling={false}>采购入库</Text>
		          </TouchableOpacity>
		        </View>
		        <View style={styles.lists}>
		          <ListView
		            dataSource={dataSource}
		            enableEmptySections={true}
		            renderRow={ this.renderRow }
		            renderHeader={this.renderHeader}
		            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
		            initialListSize={5}
		            pageSize={5}
		            refreshControl={
		              <RefreshControl
		                refreshing={myVouch['012009'].isFetching}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReadyVouch);