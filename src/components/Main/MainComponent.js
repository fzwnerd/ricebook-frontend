import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Nevigate from './NevigateComponent';
import Upload from './UploadComponent';
import Following from './FollowingComponent';
import Posts from './PostsComponent';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="row-content">
                            <Nevigate profile={this.props.profile}
                                    uploadHeadline={this.props.uploadHeadline}
                                    isHeadlineUploaded={this.props.actionLogs.isHeadlineUploaded}
                                    headlineUploadErrmsg={this.props.actionLogs.headlineUploadErrmsg}
                                    logout={this.props.logout}
                                    nevigate={this.props.nevigate} />
                        </div>
                        <div className="row-content">
                            <Following friends={this.props.profile.following} 
                                        unfollow={this.props.unfollow}
                                        follow={this.props.follow} />
                        </div>
                    </div>
                    <div className="col-12 col-md"> 
                        <div className="row-content ">                       
                            <Upload uploadPost={this.props.uploadPost} /> 
                        </div> 
                        <div className="row-content">                       
                            <Posts posts={this.props.profile.articles} logger={this.props.profile.username}
                                 editArticle={this.props.editArticle}
                                 addComment={this.props.addComment}
                                 editComment={this.props.editComment}   /> 
                        </div>                     
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;