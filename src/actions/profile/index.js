import types from '../../constants';
import DXInfoWebApi from '../../lib/DXInfoWebApi';
import Toast from 'react-native-root-toast';
import {
    Actions
} from 'react-native-router-flux';
import AppAuthToken from '../../lib/AppAuthToken';

export function deleteTokenRequest() {
    return {
        type: types.DELETE_TOKEN_REQUEST
    };
}
export function deleteTokenSuccess() {
    return {
        type: types.DELETE_TOKEN_SUCCESS
    };
}
export function deleteTokenFailure(error) {
    return {
        type: types.DELETE_TOKEN_FAILURE,
        payload: error
    }
}
export function deleteToken() {
    return dispatch => {
        dispatch(deleteTokenRequest());
        return new AppAuthToken().deleteToken()
            .then(() => {
                dispatch(deleteTokenSuccess());
            })
            .catch((error) => {
                dispatch(deleteTokenFailure(error));
            });
    };
}

export function getProfileRequest() {
  return {
    type: types.GET_PROFILE_REQUEST
  };
}
export function getProfileSuccess(json) {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: json
  };
}
export function getProfileFailure(json) {
  return {
    type: types.GET_PROFILE_FAILURE,
    payload: json
  };
}
export function getProfile(token,url) {
  return dispatch => {
    dispatch(getProfileRequest());
    return new DXInfoWebApi(token,url).getProfile()
      .then((json) => {
        if(json && json.fullName){
          dispatch(getProfileSuccess(json));
        }else{
          dispatch(deleteToken());
          Actions.Login();
        }
        
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        dispatch(getProfileFailure(errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0
        });
      });
  };
}

export function updateProfileRequest() {
  return {
    type: types.UPDATE_PROFILE_REQUEST
  }
}
export function updateProfileSuccess() {
  return {
    type: types.UPDATE_PROFILE_SUCCESS
  }
}
export function updateProfileFailure(error) {
  return {
    type: types.UPDATE_PROFILE_FAILURE,
    payload: error
  }
}
export function updateProfile(token, fullname,url) {
  return dispatch => {
    dispatch(updateProfileRequest());
    return new DXInfoWebApi(token,url).updateProfile(fullname)
      .then((json) => {
        dispatch(updateProfileSuccess());
      })
      .catch((error) => {
        dispatch(updateProfileFailure(error));
      });
  };
}

export function getUserFuncsRequest() {
  return {
    type: types.GET_USERFUNCS_REQUEST
  };
}
export function getUserFuncsSuccess(json) {
  return {
    type: types.GET_USERFUNCS_SUCCESS,
    payload: json
  };
}
export function getUserFuncsFailure(json) {
  return {
    type: types.GET_USERFUNCS_FAILURE,
    payload: json
  };
}
export function getUserFuncs(token,url) {
  return dispatch => {
    dispatch(getUserFuncsRequest());
    return new DXInfoWebApi(token,url).getUserFuncs()
      .then((json) => {
        dispatch(getUserFuncsSuccess(json));
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        dispatch(getUserFuncsFailure(errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0
        });
      });
  };
}

export function getWhListRequest() {
  return {
    type: types.GET_WHLISTS_REQUEST
  };
}
export function getWhListSuccess(json) {
  return {
    type: types.GET_WHLISTS_SUCCESS,
    payload: json
  };
}
export function getWhListFailure(json) {
  return {
    type: types.GET_WHLISTS_FAILURE,
    payload: json
  };
}
export function getWhList(token,url) {
  return dispatch => {
    dispatch(getWhListRequest());
    return new DXInfoWebApi(token,url).getWhList()
      .then((json) => {
        dispatch(getWhListSuccess(json));
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        dispatch(getWhListFailure(errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0
        });
      });
  };
}