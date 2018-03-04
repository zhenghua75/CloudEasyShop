import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GiftedChat, Actions, Bubble,LoadEarlier,InputToolbar,Composer } from 'react-native-gifted-chat';
import CustomView from '../components/CustomView';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
let ws;

class MyGiftedChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.renderLoadEarlier = this.renderLoadEarlier.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);
    this._isAlright = null;
  }

  componentWillMount() {
    ws = new WebSocket('ws://www.kmdx.cn:2012');
    ws.onopen = () => {
        const { auth } = this.props;
        ws.send('conn { UserId: '+auth.token.userId+',DeptId: '+auth.token.deptId+',WhId: '+auth.token.whId+'}');
    };

    ws.onmessage = (e) => {
        this.onReceive(e.data);
    };

    ws.onerror = (e) => {
        console.log(e.message);
    };

    ws.onclose = (e) => {
        console.log(e.code, e.reason);
    };
  }
  componentDidMount(){
    const { auth,message,linkman,actions } = this.props;
    actions.getMessage(auth.token.access_token,linkman,0,auth.info.api).then(
      ()=>{
        this.setState({messages:this.props.message.messages})
      }
    );
  }
  componentWillUnmount() {
    if (ws) {
      ws.close();
    }
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    const { auth,message,linkman,actions } = this.props;
    actions.getMessage(auth.token.access_token,linkman,message.page+1,auth.info.api).then(()=>
      this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, this.props.message.messages),
            isLoadingEarlier: false,
          };
        })
    );
   
  }

  onSend(content) {
    const { auth,linkman } = this.props;
    let text = content[0].text;
    let message = 'chat {Sender:'+auth.token.userId+',Name:"'+auth.token.fullName+'",AuthorType:'+linkman.AuthorType+',Receiver:'+linkman.Id+',ScopeType:'+linkman.ScopeType+',Content:"'+text+'"}';
    ws.send(message);
  }

  onReceive(text) {
    let json = JSON.parse(text);
    
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, json),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText} allowFontScaling={false}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }
  renderLoadEarlier(loadEarlierProps){
    loadEarlierProps.label = '更早......';
    return (
      <LoadEarlier {...loadEarlierProps} allowFontScaling={false}/>
    );
  }
  renderInputToolbar(inputToolbarProps){
    inputToolbarProps.label = '发送';
    inputToolbarProps.placeholder="输入......";
    return (
      <InputToolbar
        {...inputToolbarProps}
      />
    );
  }
  render() {
    const { actions,auth } = this.props;
    let userId = parseInt(auth.token.userId);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: userId,
        }}

        
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
        locale={'zh-cn'}
        renderLoadEarlier={this.renderLoadEarlier}
        renderInputToolbar={this.renderInputToolbar}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});


function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions,dispatch),
    dispatch
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(MyGiftedChat);