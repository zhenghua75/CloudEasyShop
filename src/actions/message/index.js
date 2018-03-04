import types from '../../constants';
import DXInfoWebApi from '../../lib/DXInfoWebApi';
import {
    Actions
} from 'react-native-router-flux';

export function linkmanRequest() {
    return {
        type: types.LINKMAN_REQUEST
    }
}
export function linkmanSuccess(json) {
    return {
        type: types.LINKMAN_SUCCESS,
        payload: json
    }
}
export function linkmanFailure(error) {
    return {
        type: types.LINKMAN_FAILURE,
        payload: error
    }
}
export function linkman(token,url) {
    return dispatch => {
        dispatch(linkmanRequest());
        return new DXInfoWebApi(token,url).linkman()
            .then((json) => {
                dispatch(linkmanSuccess(json));
            })
            .catch((error) => {
                dispatch(linkmanFailure(error));
            });
    };
}

export function getMessageRequest(){
    return {
        type:types.GET_MESSAGE_REQUEST
    }
}
export function getMessageSuccess(json,page){
    return {
        type:types.GET_MESSAGE_SUCCESS,
        payload:json,
        page:page
    }
}
export function getMessageFailure(error){
    return {
        type:types.GET_MESSAGE_FAILURE,
        payload:error
    }
}
export function getMessage(token, linkman,page,url) {
    return dispatch => {
        dispatch(getMessageRequest());
        return new DXInfoWebApi(token,url).getMessage(linkman.Type,linkman.Id,page)
            .then((json) => {
                dispatch(getMessageSuccess(json,page));
                //Actions.Comment({linkman:linkman});
            })
            .catch((error) => {
                dispatch(getMessageFailure(error));
            });
    };
}

export function readMessageRequest() {
    return {
        type: types.READ_MESSAGE_REQUEST
    }
}
export function readMessageSuccess(json) {
    return {
        type: types.READ_MESSAGE_SUCCESS,
        payload: json
    }
}
export function readMessageFailure(error) {
    return {
        type: types.READ_MESSAGE_FAILURE,
        payload: error
    }
}
export function readMessage(token, data,url) {
    let messages = [];
    let content = JSON.parse(data.MessageContent);
    let vouchType = '';
    switch (content.VouchType) {
        case '003':
            vouchType = '收货';
            break;
        case '009':
            vouchType = '发货';
            break;
        case '012':
            vouchType = '叫货';
            break;
        case '014':
            vouchType = '生产计划';
            break;
    }
    messages.push({
        _id: Math.round(Math.random() * 1000000),
        text: vouchType + content.Code,
        createdAt: data.Created,
        user: {
            _id: data.FromUserId,
            name: data.FromFullName,
        },
    });
    if (!data.Readed) {
        return dispatch => {
            dispatch(readMessageRequest());
            return new DXInfoWebApi(token,url).readMessage(data.Id)
                .then((json) => {
                    dispatch(readMessageSuccess(messages));
                    Actions.Comment();
                })
                .catch((error) => {
                    dispatch(readMessageFailure(error));
                });
        };
    } else {
        return dispatch => {
            dispatch(readMessageSuccess(messages));
            Actions.Comment();
        };
    }

}

export function connectionOpened() {
    return {
        type: types.CONNECTION_OPENED
    }
}
export function connectionError(error) {
    return {
        type: types.CONNECTION_ERROR,
        payload: error
    }
}
export function connectionClosed(error){
    return {
        type:types.CONNECTION_CLOSED,
        payload:error
    }
}

export function receiveMessage(json) {
    return {
        type: types.RECEIVE_MESSAGE,
        payload: json
    }
}

export function sendMessage(json) {
    return dispatch => {
        global.ws.send(JSON.stringify(json));
    };

}


export function chat() {
    return dispatch => {
        var ws = new WebSocket('ws://host.com/path');
        ws.onopen = () => {
            ws.send('conn { UserId: 50,DeptId: 4,WhId: 22}');
            dispatch(connectionOpened());
        };

        ws.onmessage = (e) => {
            let json = JSON.parse(e.data);
            dispatch(receiveMessage(json));
        };

        ws.onerror = (e) => {
            dispatch(connectionError(error));
        };

        ws.onclose = (e) => {
            dispatch(connectionClosed(e));
        };
        global.ws = ws;
        
    };

}