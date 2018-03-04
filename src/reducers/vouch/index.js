import types from '../../constants';

export default function vouch(state = {}, action) {
    switch (action.type) {
        case types.VOUCH_REQUEST:
        case types.VOUCHS_REQUEST:
        case types.VOUCHANDVOUCHS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.VOUCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                vouch: action.payload
            });
        case types.VOUCHS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                vouchs: action.payload
            });
        case types.VOUCHANDVOUCHS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                vouch: action.payload.vouch,
                vouchs: action.payload.vouchs
            });
        case types.VOUCH_FAILURE:
        case types.VOUCHS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.payload
            });
        case types.VOUCHANDVOUCHS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                vouch: action.payload.vouch,
                vouchs: action.payload.vouchs
            });
        default:
            return state;
    }
}