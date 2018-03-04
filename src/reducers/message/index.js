import types from '../../constants';

export default function message(state={},action){
    switch(action.type){
        case types.LINKMAN_REQUEST:
        case types.GET_MESSAGE_REQUEST:
        case types.READ_MESSAGE_REQUEST:
            return Object.assign({},state,{
                isFetching:true,
                error:null
            });
        case types.LINKMAN_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                linkmans:action.payload,
                error:null
            })
        case types.GET_MESSAGE_SUCCESS:
            return Object.assign({},state,{
                isFetching:false,
                messages:action.payload,
                page:action.page,
                error:null
            });
        case types.READ_MESSAGE_SUCCESS:
            return Object.assign({},state,{
                comments:action.payload,
                isFetching:false,
                error:null
            }); 
        case types.LINKMAN_FAILURE:
        case types.GET_MESSAGE_FAILURE:
        case types.READ_MESSAGE_FAILURE:
            return Object.assign({},state,{
                isFetching:false,
                error:action.payload
            });

        case types.CONNECTION_ERROR:
            return Object.assign({},state,{
                error:action.payload
            }); 
        case types.RECEIVE_MESSAGE:
            let comments = [];
            if(state.comments){
                comments = state.comments;
            }
            return Object.assign({},state,{
                comments:[...action.payload,...comments]
            }); 
        default:
            return state;
    }
}