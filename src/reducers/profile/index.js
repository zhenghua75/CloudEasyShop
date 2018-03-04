import types from '../../constants';

export default function profile(state={
    isFetching:false,
    user:false,
    userfuncs:false,
    whlist:false
},action){
    switch(action.type){
        case types.GET_PROFILE_REQUEST:
            return Object.assign({},state,{
                isFetching:true
            });
        case types.UPDATE_PROFILE_REQUEST:
            return Object.assign({},state,{
                isFetching:true
            });
        case types.GET_PROFILE_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                user:action.payload
            });
        case types.GET_USERFUNCS_SUCCESS:
            return Object.assign({},state,{
                userfuncs:action.payload
            });
        case types.GET_WHLISTS_SUCCESS:
            return Object.assign({},state,{
                whlist:action.payload
            });
        case types.UPDATE_PROFILE_SUCCESS:
            return Object.assign({},state,{
                isFetching:false
            });
        case types.GET_PROFILE_FAILURE:
        case types.UPDATE_PROFILE_FAILURE:
            return Object.assign({},state,{
                isFetching:false,
                error:action.payload
            });
        default:
            return state;
    }
}