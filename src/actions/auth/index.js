import types from '../../constants';
import _ from 'underscore';
import AppAuthToken from '../../lib/AppAuthToken';
import DXInfoWebApi from '../../lib/DXInfoWebApi';
import {
    Actions
} from 'react-native-router-flux';

import Toast from 'react-native-root-toast';

import JPushModule from 'jpush-react-native';

import {
    deleteToken
} from '../profile';

import EnterpriseInfo from '../../lib/EnterpriseInfo';

export function saveTokenRequest() {
    return {
        type: types.SAVE_TOKEN_REQUEST
    }
}
export function saveTokenSuccess() {
    return {
        type: types.SAVE_TOKEN_SUCCESS
    }
}
export function saveTokenFailure(error) {
    return {
        type: types.SAVE_TOKEN_FAILURE,
        payload: error
    }
}
export function saveToken(json) {
    return dispatch => {
        dispatch(saveTokenRequest());
        return new AppAuthToken().storeToken(json)
            .then(() => {
                dispatch(saveTokenSuccess());
            })
            .catch((error) => {
                dispatch(saveTokenFailure(error));
            })
    };
}


export function getTokenRequest() {
    return {
        type: types.GET_TOKEN_REQUEST
    }
}
export function getTokenSuccess(json) {
    return {
        type: types.GET_TOKEN_SUCCESS,
        payload: json
    }
}
export function getTokenFailure(error) {
    return {
        type: types.GET_TOKEN_FAILURE,
        payload: error
    }
}

function setTag(json) {
    let tag = ["CloudEasyShop", "Dept_" + json.deptId, "Wh_" + json.whId, "User_" + json.userId];
    JPushModule.setTags(tag, () => {
        //console.log("Set tag succeed");
    }, () => {
        //console.log("Set tag failed");
    });
}
export function getToken() {
    return dispatch => {
        dispatch(getTokenRequest());
        return new AppAuthToken().getToken()
            .then((token) => {
                if (token && token.access_token) {
                    dispatch(getTokenSuccess(token));

                    setTag(token);
                    Actions.Tabbar();
                } else {
                    dispatch(getTokenFailure({
                        error: 'token',
                        errordescription: 'token is null'
                    }));
                    Actions.Login();
                }
            })
            .catch((error) => {
                dispatch(getTokenFailure(error));
            });
    };
}

export function loginRequest() {
    return {
        type: types.LOGIN_REQUEST
    }
}
export function loginSuccess(json) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: json
    }
}
export function loginFailure(error) {
    return {
        type: types.LOGIN_FAILURE,
        payload: error
    }
}
export function login(username, password, url) {
    return dispatch => {
        dispatch(loginRequest());
        return new DXInfoWebApi(null, url).login({
                userName: username,
                password: password,
                grant_type: "password"
            })
            .then((json) => {
                let isalleq = true;
                let firstchar = '';
                if (password.length > 0) {
                    firstchar = password.substr(0, 1);
                } else {
                    isalleq = false;
                }
                for (var i = 1; i < password.length; i++) {
                    var chartmp = password.substr(i, 1);
                    if (firstchar != chartmp) {
                        isalleq = false;
                    }
                }
                dispatch(saveToken(json));
                dispatch(loginSuccess(json));
                setTag(json);
                Actions.Tabbar();
                if (isalleq || password === '123456') {
                    Toast.show('你的密码过于简单，登录后请尽快修改', {
                        duration: Toast.durations.LONG,
                        position: -60,
                        delay: 0,
                    });
                }
            })
            .catch((error) => {
                let errorres = {
                    isSuccess: false,
                    errorinfo: ''
                };
                if (error.State == 401) {
                    errorres.errorinfo = '偶，无权访问';
                } else {
                    if (error.exceptionType == 'System.Data.SqlClient.SqlException') {
                        errorres.errorinfo = '获取数据错误';
                    } else if (error.exceptionMessage) {
                        errorres.errorinfo = error.exceptionMessage;
                    } else if (error.message) {
                        errorres.errorinfo = error.message;
                    } else if (error.error_description) {
                        errorres.errorinfo = error.error_description;
                    } else {
                        errorres.errorinfo = '出错了哦';
                    }
                }
                dispatch(loginFailure(errorres));
                Toast.show(errorres.errorinfo, {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                });
            });
    };
}

export function logoutReqeust() {
    return {
        type: types.LOGOUT_REQUEST
    }
}

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS
    }
}

export function logoutFailure(error) {
    return {
        type: types.LOGOUT_FAILURE,
        payload: error
    }
}

export function logout(token, url) {
    return dispatch => {
        dispatch(logoutReqeust());
        new DXInfoWebApi(token, url).logout()
            .then(() => {
                dispatch(logoutSuccess());
                dispatch(deleteToken());
                Actions.Login();
            })
            .catch((error) => {
                dispatch(logoutFailure(error));
            })
    };
}

export function resetPasswordRequest() {
    return {
        type: types.RESET_PASSWORD_REQUEST
    }
}
export function resetPasswordSuccess() {
    return {
        type: types.RESET_PASSWORD_SUCCESS
    }
}
export function resetPasswordFailure(error) {
    return {
        type: types.RESET_PASSWORD_FAILURE,
        payload: error
    }
}
export function resetPassword(token, data, url) {
    return dispatch => {
        dispatch(resetPasswordRequest());
        return new DXInfoWebApi(token, url).resetPassword(data)
            .then(() => {
                dispatch(resetPasswordSuccess());
                Actions.pop();
                Toast.show('修改密码成功');
            })
            .catch((error) => {
                let errorinfo = '';
                if (error.State == 401) {
                    errorinfo = '偶，无权访问';
                } else {
                    if (error.modelState) {
                        for (var i in error.modelState) {
                            errorinfo += error.modelState[i][0];
                        }
                    } else {
                        errorinfo = error.message;
                    }
                }
                dispatch(resetPasswordFailure(error));
                Toast.show(errorinfo, {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                });
            });
    };
}



export function getEnterpriseInfoRequest() {
    return {
        type: types.GET_ENTERPRISE_INFO_REQUEST
    }
}
export function getEnterpriseInfoSuccess(json) {
    return {
        type: types.GET_ENTERPRISE_INFO_SUCCESS,
        payload: json
    }
}
export function getEnterpriseInfoFailure(error) {
    return {
        type: types.GET_ENTERPRISE_INFO_FAILURE,
        payload: error
    }
}
export function getEnterpriseInfo() {
    return dispatch => {
        dispatch(getEnterpriseInfoRequest());
        return new EnterpriseInfo().getInfo()
            .then((info) => {
                if (info) {

                    setTimeout(() => {
                        dispatch(getEnterpriseInfoSuccess(info));
                        dispatch(getToken());
                    }, 500);
                } else {
                    throw {
                        error: 'info',
                        errordescription: 'info is null'
                    }
                }
            })
            .catch((error) => {
                dispatch(getEnterpriseInfoFailure(error));
                Actions.EnterpriseInfo();
            });
    };
}


export function saveEnterpriseInfoRequest() {
    return {
        type: types.SAVE_ENTERPRISE_INFO_REQUEST
    }
}
export function saveEnterpriseInfoSuccess() {
    return {
        type: types.SAVE_ENTERPRISE_INFO_SUCCESS
    }
}
export function saveEnterpriseInfoFailure(error) {
    return {
        type: types.SAVE_ENTERPRISE_INFO_FAILURE,
        payload: error
    }
}
export function saveEnterpriseInfo(json) {
    return dispatch => {
        dispatch(saveEnterpriseInfoRequest());
        return new EnterpriseInfo().storeInfo(json)
            .then(() => {
                dispatch(saveEnterpriseInfoSuccess());
                Actions.Login();
            })
            .catch((error) => {
                dispatch(saveEnterpriseInfoFailure(error));
            })
    };
}

export function getRemoteEnterpriseInfoRequest() {
    return {
        type: types.GET_REMOTE_ENTERPRISE_INFO_REQUEST
    }
}
export function getRemoteEnterpriseInfoSuccess(json) {
    return {
        type: types.GET_REMOTE_ENTERPRISE_INFO_SUCCESS,
        payload: json
    }
}
export function getRemoteEnterpriseInfoFailure(error) {
    return {
        type: types.GET_REMOTE_ENTERPRISE_INFO_FAILURE,
        payload: error
    }
}
export function getRemoteEnterpriseInfo(shortname) {
    return dispatch => {
        dispatch(getRemoteEnterpriseInfoRequest());
        return fetch('http://download.kmdx.cn/app/json/EnterpriseInfo.json')
            .then((response) => response.json())
            .then((responseJson) => {
                let enterpriseInfo = responseJson[shortname];
                if (enterpriseInfo) {
                    dispatch(saveEnterpriseInfo(enterpriseInfo));
                    dispatch(getRemoteEnterpriseInfoSuccess(enterpriseInfo));
                } else {
                    throw {
                        error: 'info',
                        errordescription: 'info is null'
                    };
                }
            })
            .catch((error) => {
                dispatch(getRemoteEnterpriseInfoFailure(error));
                errorinfo = '未找到对应企业信息';
                Toast.show(errorinfo, {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                });
            });
    };
}