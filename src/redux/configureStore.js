import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Profile } from './profile';
import { ActionLogs } from './actionLogs';
import { InitialLogin, InitialSignup, InitialUpdate } from './forms';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { Viewpage } from './nevigate';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profile: Profile,
            viewpage: Viewpage,
            actionLogs: ActionLogs,
            ...createForms({
                login: InitialLogin,
                signup: InitialSignup,
                update: InitialUpdate
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
