import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Input, Col, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Control, Form, Errors, actions } from 'react-redux-form';


class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(values) {
        this.props.login(values.username, values.password);
        this.props.resetLoginForm();
        //if (this.props.isAuthenticated)
        //    this.props.history.push('/main');
    }

    render() {  
       
        return(
            <div className="row">
                <div className="col-12">
                    <h3 className="title">Login </h3>
                </div>
                <div className="col-12 mt-1">
                    <Form model="login" onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="form-group">
                            <div className="col-12">
                                <Label htmlFor="username">User Name</Label>
                            </div>
                            <div className="col-12 col-md-8 col-lg-6">
                                <Control.text model=".username" name="username" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-12">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <div className="col-12 col-md-8 col-lg-6">
                                <Control.text model=".password" name="password" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-12">
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </div>
                        </div>
                        <Row>
                            <Col>
                                {!this.props.isAuthenticated 
                                    && <p className="text-danger">{this.props.loginErrmsg}</p>} 
                                {!this.props.isLoggedout 
                                    && <p className="text-danger">{this.props.logoutErrmsg} </p>}   
                                {this.props.isLoggedout   
                                    && <p className="text-success">You have successfully logged out</p>}                  
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;