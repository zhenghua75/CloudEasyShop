import types from '../../constants';

export default function auth(state={},action){
    switch(action.type){
        case types.GET_TOKEN_REQUEST:
        case types.LOGIN_REQUEST:
            return Object.assign({}, state, {
                isLogined:false,
                isFetching: true
            });
        case types.SAVE_TOKEN_REQUEST:
        case types.DELETE_TOKEN_REQUEST:
        case types.LOGOUT_REQUEST:
        case types.RESET_PASSWORD_REQUEST:
        case types.GET_ENTERPRISE_INFO_REQUEST:
        case types.SAVE_ENTERPRISE_INFO_REQUEST:
        case types.GET_REMOTE_ENTERPRISE_INFO_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        
        case types.SAVE_TOKEN_SUCCESS:
        case types.DELETE_TOKEN_SUCCESS:
        case types.RESET_PASSWORD_SUCCESS:
        case types.SAVE_ENTERPRISE_INFO_SUCCESS:
            return Object.assign({},state,{
                isFetching:false
            });

        case types.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLogined:false,
                isFetching: false
            });

        case types.GET_TOKEN_SUCCESS:
        case types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLogined:true,
                isFetching: false,
                token:action.payload
            });

        case types.GET_ENTERPRISE_INFO_SUCCESS:
        case types.GET_REMOTE_ENTERPRISE_INFO_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                info:action.payload
            });
        case types.GET_TOKEN_FAILURE:
        case types.LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching:false,
                isLogined:false,
                error:action.payload
            });

        case types.SAVE_TOKEN_FAILURE:
        case types.DELETE_TOKEN_FAILURE:
        case types.LOGOUT_FAILURE:
        case types.RESET_PASSWORD_FAILURE:
        case types.GET_ENTERPRISE_INFO_FAILURE:
        case types.SAVE_ENTERPRISE_INFO_FAILURE:
        case types.GET_REMOTE_ENTERPRISE_INFO_FAILURE:
            return Object.assign({},state,{
                isFetching:false,
                error:action.payload
            })
        default:
            return state;
    }
}