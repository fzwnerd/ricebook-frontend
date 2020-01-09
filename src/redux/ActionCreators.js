import * as ActionTypes from './ActionTypes';
import { baseUrl } from './baseUrl';

export const request =  ( doc, method, body, isJSON ) => {
    const requestInfo = {
        method: method,
        credentials: 'include'      
    };
    if (isJSON) {requestInfo.headers = {'Content-Type': 'application/json'};}
    if (body) {requestInfo.body = body;}
    return fetch(baseUrl + doc , requestInfo).then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            } 
        },
        error => {
            throw error;
        }
    ).then(response => (response.headers.get('Content-Type').indexOf('json') > 0) ? response.json() : response.text());
}

export const login = (username, password) => (dispatch) => { 
    return request('login', 'POST', JSON.stringify({username: username, password: password}), true)
            .then(() => dispatch(fetchUserInfo()))
            .then(() => dispatch(fetchFollowing()))
            .then(() => dispatch(fetchField('username', username)))
            .then(() => dispatch(loginSuccess()))
            .then(() => dispatch(nevigate('/main')))
            .catch(error => dispatch(loginFailed(error.message)));  
};

export const register = (username, password, email, dob, zipcode) => (dispatch) => {
    return request('register', 'POST', JSON.stringify(
                                        {username:username, 
                                            password:password,
                                            email: email,
                                            dob: dob,
                                            zipcode: zipcode}), true)
            .then(() => dispatch(registerSucceed()))
            .catch(error => dispatch(registerFail(error.message)));   
};

export const logout = () => (dispatch) => {
    return request('logout', 'PUT', null, false)
            .then(() => dispatch(logoutSucceed()))
            .then(() => dispatch(nevigate('/landing')))
            .catch(error => dispatch(logoutFail(error.message)))
}

export const uploadAvatar = (avatarForm) => (dispatch) => {
    return request('avatar', 'PUT', avatarForm, false)
            .then(() => dispatch(fetchUserInfo()))
            .then(() => dispatch(avatarUploadSucceed()))
            .catch(error => dispatch(avatarUploadFail(error.message)));
}

export const uploadHeadline = (headline) => (dispatch) => {
    return request('headline', 'PUT', JSON.stringify({
                                        headline:headline
                                        }), true)
            .then(() => dispatch(fetchUserInfo()))
            .then(() => dispatch(headlineUploadSucceed()))
            .catch(error => dispatch(headlineUploadFail(error.message)));
}

export const unfollow = (name) => (dispatch) => {
    return request('following/' + name, 'DELETE', null, false)
            .then(() => dispatch(fetchFollowing()))
            .then(() => dispatch(fetchArticles()))
            .catch(error => console.log(error.message))
}

export const follow = (name) => (dispatch) => {
    return request('following/' + name, 'PUT', null, false)
            .then(() => dispatch(fetchFollowing()))
            .then(() => dispatch(fetchArticles()))
            .catch(error => console.log(error.message))
}

export const uploadPost = (postForm) => (dispatch) => {
    return request('article', 'POST', postForm, false)
            .catch(error => console.log(error.message));
}

export const updateEmail = (email) => (dispatch) => {
    return request('email', 'PUT', JSON.stringify({email:email}), true)
        .then(() => dispatch(fetchField('email', email)))
        .then(error => console.log(error.message));
}

export const updateZipcode = (zipcode) => (dispatch) => {
    return request('zipcode', 'PUT', JSON.stringify({zipcode:zipcode}), true)
    .then(() => dispatch(fetchField('zipcode', zipcode)))
    .then(error => console.log(error.message));
}

export const updatePassword = (pw) => () => {
    return request('password', 'PUT', JSON.stringify({password:pw}), true)
    .then(error => console.log(error.message));
}

export const loginFailed = (errmsg) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmsg
})

export const loginSuccess = () => ({
    type: ActionTypes.LOGIN_SUCCESS
})

export const registerSucceed = () => ({
    type: ActionTypes.REGISTER_SUCCEED
})

export const registerFail = (errmsg) => ({
    type: ActionTypes.REGISTER_FAIL,
    payload: errmsg
})

export const avatarUploadSucceed = () => ({
    type: ActionTypes.UPLOAD_AVATAR_SUCCEED
})

export const avatarUploadFail = (errmsg) => ({
    type: ActionTypes.UPLOAD_AVATAR_FAIL,
    payload: errmsg
})

export const headlineUploadSucceed = () => ({
    type: ActionTypes.UPLOAD_HEADLINE_SUCCEED
})

export const headlineUploadFail = (errmsg) => ({
    type: ActionTypes.UPLOAD_HEADLINE_FAIL,
    payload: errmsg
})

export const logoutSucceed = () => ({
    type: ActionTypes.LOGOUT_SUCCEED
})

export const logoutFail = (errmsg) => ({
    type: ActionTypes.LOGOUT_FAIL,
    payload: errmsg
})


export const fetchUserInfo = () => (dispatch) => {
    
    //const fields = ['email', 'headlines', 'zipcode', 'dob', 'avatars'];
    const fields = ['email', 'articles', 'zipcode', 'dob', 'headlines', 'avatars'];
    const actions = fields.map((field) => {          
            return request(field, 'GET', null, false)
                .then(response => dispatch(fetchField(field, response[field])))
    });
    
}

export const fetchHeadline = () => (dispatch) => {
    return request('headlines', 'GET', null, false)
        .then(response => dispatch(fetchField('headlines'), response.headlines));
}

export const fetchAvatar = () => (dispatch) => {
    return request('avatars', 'GET', null, false)
        .then(response => dispatch(fetchField('avatars'), response.avatars))
}

export const fetchFollowing = () => (dispatch) => {
    return request('following', 'GET',null, false)
        .then(response => {
            if (response.following.length > 0) {
                const followers = response.following.reduce((object, item) => 
                                            {object[item] = {username: item}; return object},{});
                const followersStr = response.following.join(',');
                const followersHeadline = request(`headlines/${followersStr}`,'GET', null, false)
                                        .then(response => response.headlines.forEach(item => {
                                            followers[item.username].headline = item.headline; 
                                        }));
                
                const followersAvatar = request(`avatars/${followersStr}`,'GET', null, false)
                .then(response => response.avatars.forEach(item => {
                    followers[item.username].avatar = item.avatar; 
                }));

                Promise.all([followersHeadline, followersAvatar]).then(() =>
                                            dispatch(fetchField('following', Object.values(followers).sort((a, b) => a.username.localeCompare(b.username)))));

                //dispatch(fetchField('following', Object.values(followers)));

            }
            else {
                dispatch(fetchField('following', []));
            }
        })      
}

export const fetchArticles = () => (dispatch) => {
    return request('articles', 'GET', null, false) 
        .then(response => {
            dispatch(fetchField('articles', response.articles))
        }).catch(error => console.log(error.message));
            
}

export const editArticle = (text, postId) => (dispatch) => {
    return request('articles/' + postId, 'PUT', JSON.stringify({text:text}), true)
        .then(() => dispatch(fetchArticles()))
        .catch(error => console.log(error.message));
}

export const addComment = (text, postId) => (dispatch) => {
    return request('articles/' + postId, 'PUT', JSON.stringify({text:text, commentId:-1}), true)
        .then(() => dispatch(fetchArticles()))
        .catch(error => console.log(error.message));
}

export const editComment = (text, postId, commentId) => (dispatch) => {
    return request('articles/' + postId, 'PUT', JSON.stringify({text:text, commentId:commentId}), true)
        .then(() => dispatch(fetchArticles()))
        .catch(error => console.log(error.message))
}

export const fetchField = (field, value) => ({
    type: ActionTypes.FETCH_FIELD,
    payload: { field: field, value: value}
})

export const nevigate = (page) => ({
    type: ActionTypes.NEVIGATE,
    payload: page
})