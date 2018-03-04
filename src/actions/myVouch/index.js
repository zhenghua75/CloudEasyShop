import types from '../../constants';
import DXInfoWebApi from '../../lib/DXInfoWebApi';
import {
  Actions
} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

export function getVouchRequest(vouchType) {
  return {
    type: types.GET_VOUCH_REQUEST,
    vouchType: vouchType
  };
}
export function getVouchSuccess(vouchType, json) {
  return {
    type: types.GET_VOUCH_SUCCESS,
    payload: json,
    vouchType: vouchType
  };
}
export function getVouchFailure(vouchType, json) {
  return {
    type: types.GET_VOUCH_FAILURE,
    payload: json,
    vouchType: vouchType
  };
}
export function getVouch(token, data,url) {
  return dispatch => {
    dispatch(getVouchRequest(data.VouchType));
    return new DXInfoWebApi(token,url).getVouch(data)
      .then((json) => {
        dispatch(getVouchSuccess(data.VouchType, json));
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (typeof(error) === 'string' && error.includes('DOCTYPE html')) {
          errorres.errorinfo = '获取数据错误';
        } else if (typeof(error) === 'object' && error.exceptionType === 'System.Data.SqlClient.SqlException') {
          errorres.errorinfo = '获取数据错误';
        } else if (error.exceptionMessage) {
          errorres.errorinfo = error.exceptionMessage;
        } else if (error.message) {
          errorres.errorinfo = error.message;
        }
        dispatch(getVouchFailure(data.VouchType, errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0,
        });
      });
  };
}
export function getCallVouch(token, data,url) {
  return dispatch => {
    dispatch(getVouchRequest('012000'));
    return new DXInfoWebApi(token,url).getCallVouch(data)
      .then((json) => {
        dispatch(getVouchSuccess('012000', json));
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (typeof(error) === 'string' && error.includes('DOCTYPE html')) {
          errorres.errorinfo = '获取数据错误';
        } else if (typeof(error) === 'object' && error.exceptionType === 'System.Data.SqlClient.SqlException') {
          errorres.errorinfo = '获取数据错误';
        } else if (error.exceptionMessage) {
          errorres.errorinfo = error.exceptionMessage;
        } else if (error.message) {
          errorres.errorinfo = error.message;
        }
        dispatch(getVouchFailure('012000', errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0
        });
      });
  };
}
export function getVouchLink(token, data,url) {
  return dispatch => {
    dispatch(getVouchRequest('012001'));
    return new DXInfoWebApi(token,url).getVouchLink(data)
      .then((json) => {
        dispatch(getVouchSuccess('012001', json));
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (typeof(error) == 'string' && error.includes('DOCTYPE html')) {
          errorres.errorinfo = '获取数据错误';
        } else if (typeof(error) == 'object' && error.exceptionType == 'System.Data.SqlClient.SqlException') {
          errorres.errorinfo = '获取数据错误';
        } else if (error.exceptionMessage) {
          errorres.errorinfo = error.exceptionMessage;
        } else if (error.message) {
          errorres.errorinfo = error.message;
        }
        dispatch(getVouchFailure('012001', errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0,
        });
      });
  };
}
export function getPendingVouch(token,url) {
  return dispatch => {
    dispatch(getVouchRequest('pendingnum'));
    return new DXInfoWebApi(token,url).GetPendingVouch()
      .then((json) => {
        dispatch(getVouchSuccess('pendingnum', json));
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (typeof(error) == 'string' && error.includes('DOCTYPE html')) {
          errorres.errorinfo = '获取数据错误';
        } else if (typeof(error) == 'object' && error.exceptionType == 'System.Data.SqlClient.SqlException') {
          errorres.errorinfo = '获取数据错误';
        } else if (error.exceptionMessage) {
          errorres.errorinfo = error.exceptionMessage;
        } else if (error.message) {
          errorres.errorinfo = error.message;
        }
        dispatch(getVouchFailure('pendingnum', errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0,
        });
      });
  };
}