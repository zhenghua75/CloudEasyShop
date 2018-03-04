import types from '../../constants';

export default function myVouch(state = {}, action) {
    let myvouch = {};
    switch (action.type) {
        case types.GET_VOUCH_REQUEST:
            myvouch[action.vouchType] = {
                isFetching: true,
                vouch: null
            };
            return Object.assign({}, state, myvouch);
        case types.GET_VOUCH_SUCCESS:
            myvouch[action.vouchType] = {
                isFetching: false,
                vouch: action.payload
            };
            return Object.assign({}, state, myvouch);
        case types.GET_VOUCH_FAILURE:
            myvouch[action.vouchType] = {
                isFetching: false,
                error: action.payload
            };
            return Object.assign({}, state, myvouch);
        default:
            if (Object.keys(state).length > 0) {
                return state;
            } else {
                myvouch['012'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['012009'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['012000'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['012001'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['014'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['009'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['003'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['006'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['006001'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['001'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['pendingnum'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['010'] = {
                    isFetching: false,
                    vouch: null
                };
                myvouch['016'] = {
                    isFetching: false,
                    vouch: null
                };
                return Object.assign({}, state, myvouch);
            }
    }
}