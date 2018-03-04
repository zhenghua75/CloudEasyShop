import types from '../../constants';
import DXInfoWebApi from '../../lib/DXInfoWebApi';
import {
  Actions
} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

export function vouchRequest() {
  return {
    type: types.VOUCH_REQUEST
  };
}
export function vouchSuccess(json) {
  return {
    type: types.VOUCH_SUCCESS,
    payload: json
  };
}
export function vouchFailure(json) {
  return {
    type: types.VOUCH_FAILURE,
    payload: json
  };
}
export function vouch(token, vouchType, data,url) {
  return dispatch => {
    dispatch(vouchRequest());
    return new DXInfoWebApi(token,url).vouch(vouchType, data)
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
          dispatch(vouchFailure(errorres));
          Toast.show(errorres.errorinfo, {
            duration: Toast.durations.LONG,
            position: -60,
            delay: 0,
          });
        } else {
          if (data.action) {
            if (data.action == 'remove') {
              Toast.show('删除成功', {
                position: -60,
                delay: 0,
              });
            } else if (data.action == 'create') {
              Actions.pop();
              Toast.show('创建成功', {
                duration: Toast.durations.LONG,
                position: -60,
                delay: 0,
              });
            } else {
              let vouchid = Object.keys(data.data)[0];
              vouchid = vouchid.replace('row_', '');
              let datavouchreq = {
                draw: 1,
                columns: [{
                  data: 'DT_RowId',
                  name: '',
                  searchable: true,
                  orderable: true,
                  search: {
                    value: '=' + vouchid,
                    regex: false
                  }
                }, {
                  data: 'Vouch.VouchType',
                  name: '',
                  searchable: true,
                  orderable: true,
                  search: {
                    value: '=' + vouchType,
                    regex: false
                  }
                }],
                order: [{
                  column: 0,
                  dir: 'asc'
                }],
                start: 0,
                length: 1,
                search: {
                  value: '',
                  regex: false
                }
              };
              return new DXInfoWebApi(token,url).vouch(vouchType, datavouchreq)
                .then((jsonnew) => {
                  dispatch(vouchSuccess(jsonnew));
                  if (data.action == 'edit') {
                    Actions.pop();
                    Toast.show('修改成功', {
                      duration: Toast.durations.LONG,
                      position: -60,
                      delay: 0,
                    });
                  } else if (data.action == 'verify') {
                    Actions.pop();
                    Toast.show('审核成功', {
                      duration: Toast.durations.LONG,
                      position: -60,
                      delay: 0,
                    });
                  } else if (data.action == 'unverify') {
                    Actions.pop();
                    Toast.show('弃审成功', {
                      duration: Toast.durations.LONG,
                      position: -60,
                      delay: 0,
                    });
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
                      errorres.errorinfo = '获取或提交数据错误';
                    } else if (error.exceptionMessage) {
                      errorres.errorinfo = error.exceptionMessage;
                    } else if (error.message) {
                      errorres.errorinfo = error.message;
                    }
                  }
                  dispatch(vouchFailure(errorres));
                  Toast.show(errorres.errorinfo, {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                  });
                });
            }
          } else {
            dispatch(vouchSuccess(json));
          }
        }
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (error.State == 401) {
          errorres.errorinfo = '偶，无权访问';
          dispatch(vouchFailure(errorres));
          Actions.Error({
            data: '你没有权限访问'
          });
        } else {
          if (error.exceptionType == 'System.Data.SqlClient.SqlException') {
            errorres.errorinfo = '获取或提交数据错误';
          } else if (error.exceptionMessage) {
            errorres.errorinfo = error.exceptionMessage;
          } else if (error.message) {
            errorres.errorinfo = error.message;
          }
          dispatch(vouchFailure(errorres));
          Toast.show(errorres.errorinfo, {
            duration: Toast.durations.LONG,
            position: -60,
            delay: 0,
          });
        }
      });
  };
}

export function vouchsRequest() {
  return {
    type: types.VOUCHS_REQUEST
  };
}
export function vouchsSuccess(json) {
  return {
    type: types.VOUCHS_SUCCESS,
    payload: json
  };
}
export function vouchsFailure(json) {
  return {
    type: types.VOUCHS_FAILURE,
    payload: json
  };
}
export function vouchs(token, data,url) {
  return dispatch => {
    dispatch(vouchsRequest());
    return new DXInfoWebApi(token,url).vouchs(data)
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
          dispatch(vouchsFailure(errorres));
          Toast.show(errorres.errorinfo, {
            duration: Toast.durations.LONG,
            position: -60,
            delay: 0,
          });
        } else {
          if (data.action) {
            let vouchsid = Object.keys(data.data)[0];
            let datavouchsreq = {
              draw: 1,
              columns: [{
                data: 'Vouchs.VouchId',
                name: '',
                searchable: true,
                orderable: true,
                search: {
                  value: '=' + data.data[vouchsid].Vouchs.VouchId,
                  regex: false
                }
              }],
              order: [{
                column: 0,
                dir: 'asc'
              }],
              start: 0,
              length: -1,
              search: {
                value: '',
                regex: false
              }
            };
            return new DXInfoWebApi(token,url).vouchs(datavouchsreq)
              .then((jsonnew) => {
                dispatch(vouchsSuccess(jsonnew));
                if (data.action == 'create') {
                  Toast.show('添加成功', {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                  });
                } else if (data.action == 'edit') {
                  Actions.pop();
                  Toast.show('修改成功', {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                  });
                } else if (data.action == 'remove') {
                  Toast.show('删除成功', {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                  });
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
                    errorres.errorinfo = '获取或提交数据错误';
                  } else if (error.exceptionMessage) {
                    errorres.errorinfo = error.exceptionMessage;
                  } else if (error.message) {
                    errorres.errorinfo = error.message;
                  }
                }
                dispatch(vouchsFailure(errorres));
                Toast.show(errorres.errorinfo, {
                  duration: Toast.durations.LONG,
                  position: -60,
                  delay: 0,
                });
              });
          } else {
            dispatch(vouchsSuccess(json));
          }
        }
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (error.State == 401) {
          errorres.errorinfo = '偶，无权访问';
          dispatch(vouchsFailure(errorres));
          Actions.Error({
            data: '你没有权限访问'
          });
        } else {
          if (error.exceptionType == 'System.Data.SqlClient.SqlException') {
            errorres.errorinfo = '获取或提交数据错误';
          } else if (error.exceptionMessage) {
            errorres.errorinfo = error.exceptionMessage;
          } else if (error.message) {
            errorres.errorinfo = error.message;
          }
          dispatch(vouchsFailure(errorres));
          Toast.show(errorres.errorinfo, {
            duration: Toast.durations.LONG,
            position: -60,
            delay: 0,
          });
        }
      });
  };
}

export function vouchAndVouchsRequest() {
  return {
    type: types.VOUCHANDVOUCHS_REQUEST
  };
}
export function vouchAndVouchsSuccess(vouchJson, vouchsJson) {
  let json = {
    vouch: vouchJson,
    vouchs: vouchsJson
  };
  return {
    type: types.VOUCHANDVOUCHS_SUCCESS,
    payload: json
  };
}
export function vouchAndVouchsFailure(vouchJson, vouchsJson) {
  let json = {
    vouch: vouchJson,
    vouchs: vouchsJson
  };
  return {
    type: types.VOUCHANDVOUCHS_FAILURE,
    payload: json
  };
}

export function vouchAndVouchs(token, vouchType, vouchData, vouchsData,url) {
  return dispatch => {
    dispatch(vouchAndVouchsRequest());
    return new DXInfoWebApi(token,url).vouch(vouchType, vouchData)
      .then((json) => {
        if (json.error !== null || json.fieldErrors.length > 0) {
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
          dispatch(vouchAndVouchsFailure(errorres, errorres));
        } else {
          if (vouchData.action === 'create') {
            let rowId = json.data[0].DT_RowId;
            let vouchId = parseInt(rowId.substring(4));
            for (var d = 0; d < vouchsData.data.length; d++) {
              vouchsData.data[d].Vouchs.VouchId = vouchId;
            }
          }
          let vouchjson = json;
          return new DXInfoWebApi(token,url).vouchs(vouchsData)
            .then((json) => {
              if (json.error !== null || json.fieldErrors.length > 0) {
                let errorres = {
                  isSuccess: true,
                  errorinfo: ''
                };
                if (json.fieldErrors.length > 0) {
                  for (var i in json.fieldErrors) {
                    errorres.errorinfo += json.fieldErrors[i].status + '\n';
                  }
                } else if (json.error) {
                  errorres.errorinfo = json.error;
                }
                if (vouchData.action === 'create') {
                  dispatch(vouchAndVouchsFailure(vouchjson, errorres));
                  Actions.pop();
                  Toast.show('单据添加成功，但是明细添加失败', {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                  });
                } else {
                  dispatch(vouchAndVouchsFailure(vouchjson, errorres));
                }
              } else {
                if (vouchData.action === 'create') {
                  dispatch(vouchAndVouchsSuccess(vouchjson, json));
                  Actions.pop();
                  Toast.show('添加成功', {
                    duration: Toast.durations.LONG,
                    position: -60,
                    delay: 0,
                  });
                } else {
                  dispatch(vouchAndVouchsSuccess(vouchjson, json));
                }
              }
            })
            .catch((error) => {
              let errorres = {
                isSuccess: false,
                errorinfo: '无法请求网络资源'
              };
              if (error.State === 401) {
                errorres.errorinfo = '偶，无权访问';
              } else {
                if (error.exceptionType === 'System.Data.SqlClient.SqlException') {
                  errorres.errorinfo = '获取或提交数据错误';
                } else if (error.exceptionMessage) {
                  errorres.errorinfo = error.exceptionMessage;
                } else if (error.message) {
                  errorres.errorinfo = error.message;
                }
              }
              if (vouchData.action === 'create') {
                dispatch(vouchAndVouchsFailure(vouchjson, errorres));
                Actions.pop();
                Toast.show('单据添加成功，但是明细添加失败', {
                  duration: Toast.durations.LONG,
                  position: -60,
                  delay: 0
                });
              } else {
                dispatch(vouchAndVouchsFailure(vouchjson, errorres));
              }
            });
        }
      })
      .catch((error) => {
        let errorres = {
          isSuccess: false,
          errorinfo: '无法请求网络资源'
        };
        if (error.State == 401) {
          errorres.errorinfo = '你没有权限访问';
          dispatch(vouchAndVouchsFailure(errorres, errorres));
          Actions.Error({
            data: '你没有权限访问'
          });
        } else {
          if (error.exceptionType == 'System.Data.SqlClient.SqlException') {
            errorres.errorinfo = '获取或提交数据错误';
          } else if (error.exceptionMessage) {
            errorres.errorinfo = error.exceptionMessage;
          } else if (error.message) {
            errorres.errorinfo = error.message;
          }
          dispatch(vouchAndVouchsFailure(errorres, errorres));
          Toast.show(errorres.errorinfo, {
            duration: Toast.durations.LONG,
            position: -60,
            delay: 0
          });
        }
      });
  };
}