import React, { Component } from 'react';
import { Nav, NavItem, Navbar, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Nevigate extends Component {

    constructor(props) {
        super(props);

        this.updataStatus = this.updataStatus.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    updataStatus = () => {
        this.props.uploadHeadline(document.getElementById("status").value);
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        /*
        if (this.props.avatar) {
            const avatar = this.props.avatar.get('image');
            let reader = new FileReader();
            reader.onload = function(event) {  
                document.getElementById('avatarInMain').src = event.target.result;
            }
            //const image = this.props.avatar.get('image');
            reader.readAsDataURL(avatar);
        }
        */
       //onClick={() => this.props.logout()}
        return ( 
            <>          
                <div>
                    <Navbar color="info" light expand="lg">
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Button outline className="nav-link border-0 mr-2"  onClick={this.handleClick}>
                                    <i className="fas fa-sign-out-alt fa-lg"></i> Logout
                                </Button>
                            </NavItem>
                            <NavItem>
                                <Button outline className="nav-link border-0" onClick={() => {sessionStorage.setItem('viewpage', '/profile'); this.props.nevigate("/profile")}}>
                                    <i className="fa fa-address-card fa-lg"></i> Profile
                                </Button>
                            </NavItem>
                        </Nav>
                    </Navbar>                   
                </div>
                <div className="mt-2">
                    <Card>
                        <div className="pt-3 pb-1 pr-3 pl-3">
                        <CardImg  width="100%" src={this.props.profile.avatars[0].avatar ? this.props.profile.avatars[0].avatar : "https://www.w3schools.com/howto/img_avatar.png"} alt="Your avatar" id="avatarInMain" />
                        </div>
                        <CardBody>
                            <CardTitle className="mt-2 title">{this.props.profile.username}</CardTitle>
                            <CardSubtitle className="subtitle">{this.props.profile.headlines[0].headline}</CardSubtitle>
                            <Row className="mt-1">
                                <Col md="8">
                                    <textarea className="form-control rounded-1" id="status" rows="1"
                                                placeholder="new status"></textarea>
                                </Col>
                                <Col md="4">
                                    <Button type="submit" onClick={() => this.updataStatus()}>Update</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </>
        );
    }
}

export default Nevigate;
