import React, { Component } from 'react';
import { Row, Col, Label, Button } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';

//const required = (val) => val && val.length;
const validEmail = (val) => (!val) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validZipcode = (val) => (!val) || /^\d{5}$/i.test(val);


class UpdateInfo extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        if (values.email) {
            this.props.updateEmail(values.email);
            //console.log(values.email);
        } 
        if (values.zipcode) 
            this.props.updateZipcode(values.zipcode);
        if (values.password)
            this.props.updatePassword(values.password);   
    }

    render() {
        return (
            <>
                <h3 className="title">Update Your Info</h3>
                <div className="col-12 mt-1">
                <Form model="update" onSubmit={(values) => this.handleSubmit(values)}
                            validators={{
                            '': {
                            passwordsMatch: (vals) => 
                                    {   if (vals.password.length || vals.password2.length)
                                            return vals.password === vals.password2;
                                        return true;
                                    }                          
                            }}}>
                    <div className="form-group">
                        <div className="col-12">
                            <Label htmlFor="email">Email</Label>
                        </div>
                        <div className="col-12 col-md-8 col-lg-6">
                            <Control.text model=".email" name="email"
                                    placeholder="aa@bb.cc" 
                                    className="form-control" 
                                    validators={{
                                        validEmail
                                    }}
                            />
                            <Errors
                                className="text-danger"
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        validEmail: 'Invalid Email'                                        
                                    }}
                            />
                        </div>
                    </div>                   
                    <div className="form-group">
                        <div className="col-12">
                            <Label htmlFor="zipcode">Zipcode</Label>
                        </div>
                        <div className="col-12 col-md-8 col-lg-6">
                            <Control.text model=".zipcode" name="zipcode"
                                    placeholder="77030" 
                                    className="form-control" 
                                    validators={{
                                        validZipcode
                                    }}
                            />
                            <Errors
                                className="text-danger"
                                    model=".zipcode"
                                    show="touched"
                                    messages={{
                                        validZipcode: 'Invalid Zipcode'                                        
                                    }}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-12">
                            <Label htmlFor="password" >Password</Label>
                        </div>
                        <div className="col-12 col-md-8 col-lg-6">
                            <Control.text model=".password" name="password"
                                    className="form-control" 
                                    />
                        </div>                       
                    </div>
                    <div className="form-group">
                        <div className="col-12">
                            <Label htmlFor="password2">Confirm Password</Label>
                        </div>
                        <div className="col-12 col-md-8 col-lg-6">
                            <Control.text model=".password2" name="password2"
                                    className="form-control" 
                                    />
                            <Errors
                                className="text-danger"
                                model="update"
                                messages={{
                                    passwordsMatch: 'mismatch'
                                }}
                                show="touched"
                            />
                        </div>
                    </div> 
                    <div className="form-group">
                        <div className="col-12">
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </div>
                    </div> 
                </Form>
                </div>            
            </>
        );
    }
}

class CurrentInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="col-12">
                    <h3 className="title">Contact Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                    <h5 className="subtitle">{this.props.profile.username}</h5>
                    <address>
                        <i className="fas fa-reply fa-lg"></i>: <span>{this.props.profile.email}</span><br />
                        <i className="fas fa-envelope fa-lg"></i>: <span>{this.props.profile.zipcode}</span><br />
                        <i className="fas fa-birthday-cake fa-lg"></i>: <span>{(new Date(this.props.profile.dob)).toLocaleDateString('en-US',  { year: 'numeric', month: 'short', day: '2-digit' })}</span>
                    </address>
                </div>
            </>
        );
    }
}

class Info extends Component {
 
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="col-12 col-md-6">
                    <CurrentInfo profile={this.props.profile} />
                </div>
                <div className="col-12 col-md-6">
                    <UpdateInfo updateEmail={this.props.updateEmail}
                                updateZipcode={this.props.updateZipcode}
                                updatePassword={this.props.updatePassword} />
                </div>
            </>
        );
    }
}

export default Info;