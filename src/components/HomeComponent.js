import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Landing from './Landing/LandingComponent';
import Main from './Main/MainComponent';
import Profile from './Profile/ProfileComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { connect } from 'react-redux';
import { login, register, uploadAvatar, logout,  uploadHeadline, unfollow,
        follow, uploadPost, editArticle, addComment, editComment, updateEmail,
        updateZipcode, updatePassword, nevigate, keepLoginWhenRefresh } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { ActionLogs } from '../redux/actionLogs';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        viewpage: state.viewpage,
        actionLogs: state.actionLogs
    }
}



const mapDispatchToProps = (dispatch) => ({
    login: (username, password) =>  dispatch(login(username, password)),
    register: (username, password, email, dob, zipcode) => 
                        dispatch(register(username, password, email, dob, zipcode)),
    uploadAvatar: (avatarForm) => dispatch(uploadAvatar(avatarForm)),
    logout: () => dispatch(logout()),
    uploadHeadline: (headline) => dispatch(uploadHeadline(headline)),
    unfollow: (name) => dispatch(unfollow(name)),
    follow: (name) => dispatch(follow(name)),
    uploadPost: (post) => dispatch(uploadPost(post)),
    editArticle: (text, postId) => dispatch(editArticle(text, postId)),
    addComment: (text, postId) => dispatch(addComment(text, postId)),
    editComment: (text, postId, commentId) => dispatch(editComment(text, postId, commentId)),
    updateEmail: (email) => dispatch(updateEmail(email)),
    updateZipcode: (zipcode) => dispatch(updateZipcode(zipcode)),
    updatePassword: (pw) => dispatch(updatePassword(pw)),
    nevigate: (page) => dispatch(nevigate(page)),
    keepLoginWhenRefresh: () => dispatch(keepLoginWhenRefresh()),
    resetLoginForm: () => dispatch(actions.reset('login'))
})

class Home extends Component {

    constructor(props) {
        super(props);
        //this.props.keepLoginWhenRefresh();
    }

    
    componentDidMount() {
        this.props.keepLoginWhenRefresh()
    }

    render() {
        return (
            <div>
                <Header />
                {/*<Switch>*/}
                {this.props.viewpage.page==="/landing" && <Landing profile={this.props.profile} 
                                                                    login={this.props.login}  
                                                                    viewpage = {this.props.viewpage.page} 
                                                                    register={this.props.register} 
                                                                    actionLogs={this.props.actionLogs}
                                                                    nevigate={this.props.nevigate}
                                                                    resetLoginForm={this.props.resetLoginForm} /> } 
                {this.props.viewpage.page==="/main" && <Main profile={this.props.profile} 
                                                                logout={this.props.logout}
                                                                uploadHeadline={this.props.uploadHeadline} 
                                                                actionLogs={this.props.actionLogs} 
                                                                viewpage={this.props.viewpage.page} 
                                                                unfollow={this.props.unfollow}
                                                                follow={this.props.follow} 
                                                                uploadPost={this.props.uploadPost}
                                                                editArticle={this.props.editArticle}
                                                                addComment={this.props.addComment} 
                                                                editComment={this.props.editComment} 
                                                                nevigate={this.props.nevigate} />} 
                {this.props.viewpage.page==="/profile" && <Profile profile={this.props.profile} 
                                                                           actionLogs={this.props.actionLogs}
                                                                           uploadAvatar={this.props.uploadAvatar}
                                                                           updateEmail={this.props.updateEmail} 
                                                                           updateZipcode={this.props.updateZipcode} 
                                                                           updatePassword={this.props.updatePassword}
                                                                           nevigate={this.props.nevigate} />}
                <Footer />
            </div>
        );    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);