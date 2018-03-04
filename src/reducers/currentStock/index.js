import types from '../../constants';

export default function currentStock(state = {}, action) {
    switch (action.type) {
        case types.CURRENTSTOCK_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.CURRENTSTOCK_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                currentStock: action.payload
            });
        case types.CURRENTSTOCK_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.payload
            });
        default:
            if (Object.keys(state).length > 0) {
                return state;
            } else {
                let curstock = {
                    isFetching: false,
                    currentStock: null
                };
                return Object.assign({}, state, curstock);
            }
    }
}