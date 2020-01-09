import * as ActionTypes from './ActionTypes';

export const Profile = (state = {
    username: '',
    dob: '',
    avatar: null,
    email: '',
    zipcode: '',
    articles: [],
    following: [],
    headline: ''
    }, action) => {
        switch (action.type) {            
            case ActionTypes.FETCH_FIELD:
                switch (action.payload.field) {
                    case 'email':
                        return {...state, email: action.payload.value};
                    case 'username':
                        return {...state, username: action.payload.value};
                    case 'following':
                        return {...state, following: action.payload.value};
                    case 'dob':
                        return {...state, dob: action.payload.value};
                    case 'avatars':
                        return {...state, avatars: action.payload.value};
                    case 'avatar':
                        return {...state, avatar: action.payload.value};
                    case 'zipcode':
                        return {...state, zipcode: action.payload.value};
                    case 'articles':
                        return {...state, articles: action.payload.value};
                    case 'headlines':
                        return {...state, headlines: action.payload.value};
                    case 'headline':
                        return {...state, headline: action.payload.value};
                    default: 
                        return state;
                }
            case ActionTypes.EXTRACT_AVATAR:
                if (state.avatar)
                    console.dir(state.avatar);
                    return {...state, avatar: state.avatar.get('image')};
            case ActionTypes.ADD_ARTICLES:
                var articles = action.payload;
                return {...state, articles: state.articles.concat(action.payload)}
            default: 
                return state;
        }
    };