import React, { Component } from 'react';
import Login from './LoginComponent';
import Signup from './SignupComponent';

class Landing extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row row-content align-items-start">
                    <div className="col-12 col-md">
                        <Signup register={this.props.register} 
                                isRegistered={this.props.actionLogs.isRegistered} 
                                registerErrmsg={this.props.actionLogs.registerErrmsg} />
                    </div>
                    <div className="col-12 col-md">
                        <Login profile={this.props.profile} 
                                login={this.props.login}
                                viewpage={this.props.viewpage}
                                isAuthenticated={this.props.actionLogs.isAuthenticated} 
                                loginErrmsg={this.props.actionLogs.loginErrmsg}
                                isLoggedout={this.props.actionLogs.isLoggedout}
                                logoutErrmsg={this.props.actionLogs.logoutErrmsg}
                                resetLoginForm={this.props.resetLoginForm} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;