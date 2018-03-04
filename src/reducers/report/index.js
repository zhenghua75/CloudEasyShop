import types from '../../constants';

export default function report(state = {}, action) {
    switch (action.type) {
        case types.GET_REPORT_REQUEST:
            if(action.reportType!==state.reportType){
                return Object.assign({}, state, {
                    isFetching: true,
                    reportType: action.reportType,
                    report: null
                });
            }else{
                return Object.assign({}, state, {
                    isFetching: true
                });
            }
        case types.GET_REPORT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                reportType: action.reportType,
                report: action.payload
            });
        case types.GET_REPORT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                reportType: action.reportType,
                error: action.payload
            });
        default:
            return state;
    }
}