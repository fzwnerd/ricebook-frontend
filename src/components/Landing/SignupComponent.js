import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { Row, Col, Button, Label, Input } from 'reactstrap';

const required = (val) => val && val.length;
const validEmail = (val) => (!val) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validDob = (val) => (!val) || /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i.test(val);
const validZipcode = (val) => (!val) || /^\d{5}$/i.test(val);
//const passwordsMatch = (vals) => vals.password === vals.password2;
class Signup extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        //this.props.login(values.username, values.password);
        this.props.register(values.username, values.password, values.email, values.dob, values.zipcode);
    }

    render() { 
        return (
            <div className="row">
                <div className="col-12">
                    <h3 className="title">Sign up </h3>
                </div>
                <div className="col-12 mt-1">
                    <Form model="signup" onSubmit={(values) => this.handleSubmit(values)}
                        validators={{
                        '': {
                           //Form-level validator
                          passwordsMatch: (vals) => 
                                {   if (vals.password2.length)
                                        return vals.password === vals.password2;
                                    return true;
                                }                          
                        }}}>                   
                        <div className="form-group">
                            <div className="col-12">
                                <Label htmlFor="username" >User name</Label>
                            </div>
                            <div className="col-12 col-md-8 col-lg-6">
                                <Control.text model=".username" name="username"
                                        placeholder="John_Doe" 
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}
                                />                   
                                <Errors
                                    className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required'                                           
                                        }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-12">
                                <Label htmlFor="email" >Email</Label>
                            </div>
                            <div className="col-12 col-md-8 col-lg-6">
                                <Control.text model=".email" name="email"
                                        placeholder="aa@bb.cc" 
                                        className="form-control" 
                                        validators={{
                                            required,
                                            validEmail
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
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
                                            required,
                                            validZipcode
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                        model=".zipcode"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validZipcode: 'Invalid Zipcode'                                        
                                        }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-12">
                                <Label htmlFor="dob">Date of Birth</Label>
                            </div>
                            <div className="col-12 col-md-8 col-lg-6">
                                <Control.text model=".dob" name="dob"
                                        placeholder="1990-06-16" 
                                        className="form-control" 
                                        validators={{
                                            required,
                                            validDob
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                        model=".dob"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validDob: 'Invalid Date of Birth'                                        
                                        }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-12">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <div className="col-12 col-md-8 col-lg-6">
                                <Control.text model=".password" name="password"
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}/>
                                <Errors
                                    className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required'                                 
                                        }}
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
                                        validators={{
                                            required
                                        }}/>
                                 <Errors
                                    className="text-danger"
                                        model=".password2"
                                        show="touched"
                                        messages={{
                                            required: 'Required'                                 
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model="signup"
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
                                    Sign up
                                </Button>
                            </div>
                        </div> 
                        <Row>
                            <Col>
                                {!this.props.isRegistered && <p className="text-danger">{this.props.registerErrmsg} </p>}  
                                {this.props.isRegistered && <p className="text-success">You have successfully signed up </p>}                    
                            </Col> 
                        </Row>             
                    </Form>                   
                </div>
            </div>
        );
    }
}

export default Signup;