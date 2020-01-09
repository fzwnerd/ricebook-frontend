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
        updateZipcode, updatePassword } from '../redux/ActionCreators';

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
    updatePassword: (pw) => dispatch(updatePassword(pw))
})

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Header />
                <Switch>
                     <Route exact path="/landing" component={() => <Landing profile={this.props.profile} 
                                                                    login={this.props.login}  
                                                                    viewpage = {this.props.viewpage.page} 
                                                                    register={this.props.register} 
                                                                    actionLogs={this.props.actionLogs} />} /> 
                    <Route exact path="/main" component={() => <Main profile={this.props.profile} 
                                                                logout={this.props.logout}
                                                                uploadHeadline={this.props.uploadHeadline} 
                                                                actionLogs={this.props.actionLogs} 
                                                                viewpage={this.props.viewpage.page} 
                                                                unfollow={this.props.unfollow}
                                                                follow={this.props.follow} 
                                                                uploadPost={this.props.uploadPost}
                                                                editArticle={this.props.editArticle}
                                                                addComment={this.props.addComment} 
                                                                editComment={this.props.editComment} />} />
                    <Route exact path="/profile" component={() => <Profile profile={this.props.profile} 
                                                                           actionLogs={this.props.actionLogs}
                                                                           uploadAvatar={this.props.uploadAvatar}
                                                                           updateEmail={this.props.updateEmail} 
                                                                           updateZipcode={this.props.updateZipcode} 
                                                                           updatePassword={this.props.updatePassword} />} />
                    <Redirect to="/landing" />
                </Switch>
                <Footer />
            </div>
        );    
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));