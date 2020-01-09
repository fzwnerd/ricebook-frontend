import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Card, CardBody, CardImg, CardTitle, CardSubtitle, Button,
        Row, Col } from 'reactstrap';
import { request, headlineUploadFail } from '../../redux/ActionCreators';
import { baseUrl } from '../../redux/baseUrl';



class Friend extends Component {
    constructor(props) {
        super(props);      
    }

    render() {
        return (
            <Card>
                <CardImg top width="100%" src={this.props.friend.avatar} alt="avatar" />
                <CardBody>
                    <CardTitle className="title">{this.props.friend.username}</CardTitle>
                    <CardSubtitle className="subtitle">{this.props.friend.headline}</CardSubtitle>
                    <Button className="mt-2" color="danger" onClick={() => this.props.unfollow(this.props.friend.username)}>Unfollow</Button>
                </CardBody>
            </Card>
        )
    }
}

function RenderFriends({friends, unfollow, follow}) {

    const listItems = friends.map((friend) => {

        return (
            <ListGroupItem className="mb-3 border-0" key={'_' + Math.random().toString(36).substr(2, 9)}>
                <Friend friend={friend} unfollow={unfollow}/>
            </ListGroupItem>
        )
    });

    const handleClick = () => {
        follow(document.getElementById('newfriend').value);
    }

    return (
        <div>
            <Row className="justify-content-center">
                <Col md="7" >
                    <textarea className="form-control rounded-1" id="newfriend" rows="1"
                            placeholder="friend name"></textarea>
                </Col>
                <Col md="4">
                    <Button type="submit" onClick={() => handleClick()}>add</Button>
                </Col>
            </Row>
            <ListGroup className="mt-3 block-example border border-info">
                {listItems}
            </ListGroup>
        </div>
    )
}

class Following extends Component {
    constructor(props) {
        super(props);      
    }

    render() {
        return (
            <div>
                <RenderFriends friends={this.props.friends} unfollow={this.props.unfollow}
                                follow={this.props.follow} />
            </div>
        );
    }
}





export default Following;