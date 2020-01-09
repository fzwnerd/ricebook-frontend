import * as ActionTypes from './ActionTypes';

export const ActionLogs = (state = {
    isAuthenticated: false,
    loginErrmsg: '',
    isRegistered: false,
    registerErrmsg: '',
    isAvatarUploaded: false,
    avatarUploadErrmsg: '',
    isLoggedout: false,
    logoutErrmsg: '',
    isHeadlineUploaded: false,
    headlineUploadErrmsg: ''
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_FAILED:
            return {...state, loginErrmsg: action.payload, isAuthenticated: false};
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, loginErrmsg: '', isAuthenticated: true};
        case ActionTypes.REGISTER_SUCCEED:
            return {...state, registerErrmsg: '', isRegistered: true};
        case ActionTypes.REGISTER_FAIL:
            return {...state, registerErrmsg: action.payload, isRegistered: false};
        case ActionTypes.UPLOAD_AVATAR_FAIL:
            return {...state, avatarUploadErrmsg: action.payload, isAvatarUploaded: false};
        case ActionTypes.UPLOAD_AVATAR_SUCCEED: 
            return {...state, avatarUploadErrmsg: '', isAvatarUploaded: true};
        case ActionTypes.LOGOUT_SUCCEED:
            return {...state, logoutErrmsg: '', isLoggedout: true};
        case ActionTypes.LOGOUT_FAIL:
            return {...state, logoutErrmsg: action.payload, isLoggedout: false};
        case ActionTypes.UPLOAD_HEADLINE_SUCCEED:
            return {...state, headlineUploadErrmsg: '', isHeadlineUploaded: true};
        case ActionTypes.UPLOAD_HEADLINE_FAIL:
            return {...state, headlineUploadErrmsg: action.payload, isHeadlineUploaded: false};
        default: 
            return state;
    }
    
} 