import React, { Component } from 'react';
import Avatar from './AvatarComponent';
import Info from './InfoComponent';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-4">
                        <Avatar avatar={this.props.profile.avatar} 
                                avatarUploadErrmsg={this.props.actionLogs.avatarUploadErrmsg} 
                                isAvatarUploaded={this.props.actionLogs.isAvatarUploaded}
                                uploadAvatar={this.props.uploadAvatar} />
                    </div>
                </div>
                <div className="row row-content">
                    <Info profile={this.props.profile} 
                          updateEmail={this.props.updateEmail}
                          updateZipcode={this.props.updateZipcode}
                          updatePassword={this.props.updatePassword} />
                </div>
                
            </div>
        );
    }
}

export default Profile;