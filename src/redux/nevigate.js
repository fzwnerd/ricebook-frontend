import * as ActionTypes from './ActionTypes';

export const Viewpage = (state = {
    page: '/landing'
}, action) => {
    switch (action.type) {
        case ActionTypes.NEVIGATE:
            //sessionStorage.setItem('viewpage', action.payload);
            return {...state, page: action.payload};
        default: 
            //sessionStorage.setItem('viewpage', '/landing');
            return state;
    }
}