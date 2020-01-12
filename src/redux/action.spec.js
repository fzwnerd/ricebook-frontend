import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as ActionTypes from './ActionTypes';
import { logout, fetchField, fetchAvatar } from './ActionCreators';
import { ActionLogs } from './actionLogs';

describe('Validate Authentication', () => {
    let resource, url, login, logout;
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            global.fetch = fetch
            resource = require('./ActionCreators').resource
            url = require('./baseUrl').baseUrl
            //authActions = require('./authActions')
            login = require('./ActionCreators').login
            logout = require('./ActionCreators').logout
            //logoutUser = require('./authActions').logoutUser
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should log in a previously registered user', (done) => {
        const username = 'name'
        const password = 'pw'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username, result:'success'}
        })

        login(username, password)(
            (action) => {
                switch (action.type) {
                    case ActionTypes.NEVIGATE:
                        expect(action.payload).to.eql('/main')
                        break
                }
            }
        )
        done()
    })

    it('should not log in an invalid user', (done) => {
        const username = 'invalid'
        const password = 'invalid'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            status: 401
        })

        login(username, password)(
            (action) => {
                        expect(action.type).to.eql(ActionTypes.LOGIN_FALIED);
                        expect(action.payload).to.eql('Invalid username or password');
            }
        )
        done()
    })

    it('should update error message state (for displaying login error mesage to user)', (done) => {
        const username = 'invalid'
        const password = 'invalid'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            status: 401
        })

        login(username, password)(
            (action) => {
                        expect(action.type).to.eql(ActionTypes.LOGIN_FALIED);
                        expect(action.payload).to.eql('Invalid username or password');
            }
        )
        done()
    })

    it('should log out a user (login state should be cleared)', (done) => {
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })
        logout()(
            (action) => {
                expect(action.type).to.eql(ActionTypes.LOGOUT_SUCCEED);
            }
        )
        done()
    })
    
})

describe('Validate Profile actions', () => {
    let resource, url, fetchAvatar;
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            global.fetch = fetch
            resource = require('./ActionCreators').resource
            url = require('./baseUrl').baseUrl
            fetchAvatar = require('./ActionCreators').fetchAvatar
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should fetch the user\'s proile information', (done) => {
        const field = 'avatars';
        const res = { username:'name', avatar:'avatarUrl' };
        mock(`${url}/avatars/name`,{
            headers: {'Content-Type':'application/json'},
            json: { avatars: [
                { username:'name', avatar:'avatarUrl' }
            ]}
        })

        fetchAvatar()(
            action => {
                expect(action.type).to.eql(ActionTypes.FETCH_FIELD);
            }
        )
        done()
    })

})

describe('Validate Article actions', () => {
    let resource, url, fetchArticles;
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            global.fetch = fetch
            resource = require('./ActionCreators').resource
            url = require('./baseUrl').baseUrl
            fetchArticles = require('./ActionCreators').fetchArticles
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should fetch articles for current logged in user', (done) => {
        mock(`${url}/articles`,{
            headers: {'Content-Type':'application/json'},
            json: { articles: [
                { id:1, author: 'fzw', text:'post 1' },
                { id:2, author: 'fzw', text:'post 2' },
                { id:3, author: 'fzw', text:'post 3' }
            ]}
        })

        fetchArticles()(
            action => {
                expect(action.type).to.eql(ActionTypes.FETCH_FIELD);
                expect(action.payload.articles.length).to.eql(3);
            }
        )
        done();
    })
})


