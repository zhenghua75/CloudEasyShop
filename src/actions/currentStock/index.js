import types from '../../constants';
import DXInfoWebApi from '../../lib/DXInfoWebApi';
import {
  Actions
} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

export function currentStockRequest() {
  return {
    type: types.CURRENTSTOCK_REQUEST
  };
}
export function currentStockSuccess(json) {
  return {
    type: types.CURRENTSTOCK_SUCCESS,
    payload: json
  };
}
export function currentStockFailure(json) {
  return {
    type: types.CURRENTSTOCK_FAILURE,
    payload: json
  };
}
export function currentStock(token, data,url) {
  return dispatch => {
    dispatch(currentStockRequest());
    return new DXInfoWebApi(token,url).currentStock(data)
      .then((json) => {
        if (json.error != null || json.fieldErrors.length > 0) {
          let errorres = {
            isSuccess: false,
            errorinfo: ''
          };
          if (json.fieldErrors.length > 0) {
            for (var i in json.fieldErrors) {
              errorres.errorinfo += json.fieldErrors[i].status + '\n';
            }
          } else if (json.error) {
            errorres.errorinfo = json.error;
          }
          dispatch(currentStockFailure(errorres));
          Toast.show(errorres.errorinfo, {
            duration: Toast.durations.LONG,
            position: -60,
            delay: 0,
          });
        } else {
          dispatch(currentStockSuccess(json));
        }
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (error.State == 401) {
          errorres.errorinfo = '偶，无权访问';
        } else {
          if (error.exceptionType == 'System.Data.SqlClient.SqlException') {
            errorres.errorinfo = '获取数据错误';
          } else {
            errorres.errorinfo = error.exceptionMessage;
          }
        }
        dispatch(currentStockFailure(errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0,
        });
      });
  };
}

export function reportCurrentStock(token, data,url) {
  return dispatch => {
    dispatch(currentStockRequest());
    return new DXInfoWebApi(token,url).stockMgCurrentStock(data)
      .then((json) => {
        if (json.error != null || json.fieldErrors.length > 0) {
          let errorres = {
            isSuccess: false,
            errorinfo: ''
          };
          if (json.fieldErrors.length > 0) {
            for (var i in json.fieldErrors) {
              errorres.errorinfo += json.fieldErrors[i].status + '\n';
            }
          } else if (json.error) {
            errorres.errorinfo = json.error;
          }
          dispatch(currentStockFailure(errorres));
          Toast.show(errorres.errorinfo, {
            duration: Toast.durations.LONG,
            position: -60,
            delay: 0,
          });
        } else {
          dispatch(currentStockSuccess(json));
        }
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (error.State == 401) {
          errorres.errorinfo = '偶，无权访问';
        } else {
          if (error.exceptionType == 'System.Data.SqlClient.SqlException') {
            errorres.errorinfo = '获取数据错误';
          } else {
            errorres.errorinfo = error.exceptionMessage;
          }
        }
        dispatch(currentStockFailure(errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0,
        });
      });
  };
}