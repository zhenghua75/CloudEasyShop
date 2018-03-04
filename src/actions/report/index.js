import types from '../../constants';
import DXInfoWebApi from '../../lib/DXInfoWebApi';
import {
  Actions
} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

export function getReportRequest(reportType) {
  return {
    type: types.GET_REPORT_REQUEST,
    reportType: reportType
  };
}
export function getReportSuccess(reportType, json) {
  return {
    type: types.GET_REPORT_SUCCESS,
    payload: json,
    reportType: reportType
  };
}
export function getReportFailure(reportType, json) {
  return {
    type: types.GET_REPORT_FAILURE,
    payload: json,
    reportType: reportType
  };
}
export function reportSalesChart(token, reportType, data,url) {
  return dispatch => {
    dispatch(getReportRequest(reportType));
    return new DXInfoWebApi(token,url).reportSalesChart(data)
      .then((json) => {
        dispatch(getReportSuccess(reportType, json));
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
        dispatch(getReportFailure(reportType, errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0,
        });
      });
  };
}
export function reportCardTop(token, reportType, data,url) {
  return dispatch => {
    dispatch(getReportRequest(reportType));
    return new DXInfoWebApi(token,url).reportCardTop(data)
      .then((json) => {
        dispatch(getReportSuccess(reportType, json));
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
        dispatch(getReportFailure(reportType, errorres));
        Toast.show(errorres.errorinfo, {
          duration: Toast.durations.LONG,
          position: -60,
          delay: 0,
        });
      });
  };
}
