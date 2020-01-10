import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,  Nav, NavItem, Navbar, 
    CardTitle, CardSubtitle, Button, Input, InputGroup
  } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Avatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newAvatar : null
        }

        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleImageChange = e => {
       let reader = new FileReader();
       let file = e.target.files[0];
       if (file) {
        reader.onload = function(event) {           
            document.getElementById('cardimg').src = event.target.result;
         }
        reader.readAsDataURL(file);
        const fd = new FormData();
        fd.append('image', file);
        this.setState({newAvatar:fd});
       }
    }

    handleClick = () => {
        //upload new avatar
        //console.log('aaa');
        if (this.state.newAvatar)
        {
            this.props.uploadAvatar(this.state.newAvatar);
        }
    }

    
 
    render() {

        return (
            <>
                
                    <Navbar color="info" light expand="lg">
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Button outline className="nav-link border-0" onClick={() => {sessionStorage.setItem('viewpage', '/main'); this.props.nevigate("/main")}}>
                                    <i className="fas fa-sign-out-alt fa-lg"></i> Main
                                </Button>
                            </NavItem>
                        </Nav>
                    </Navbar>
                
                <Card>
                    <div className="pt-3 pb-1 pr-3 pl-3">
                        <CardImg width="100%" src="https://www.w3schools.com/howto/img_avatar.png" id="cardimg"
                                                alt="upload avatar" />  
                    </div>             
                    <CardBody>
                        <InputGroup>
                            <Input type="file" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>       
                            <Button className="mt-1" onClick={() => this.handleClick()}>Upload New Avatar</Button>                       
                        </InputGroup>
                        <p>{this.props.isAvatarUploaded}</p>
                        {!this.props.isAvatarUploaded && <p className="text-danger">{this.props.avatarUploadErrmsg} </p>} 
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default Avatar;