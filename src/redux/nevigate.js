import * as ActionTypes from './ActionTypes';

export const Viewpage = (state = {
    page: '/landing'
}, action) => {
    switch (action.type) {
        case ActionTypes.NEVIGATE:
            return {...state, page: action.payload};
        default: 
            return state;
    }
}