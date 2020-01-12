import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Media, Button, InputGroup, Input, Collapse,
        Card, CardTitle, CardText, InputGroupAddon } from 'reactstrap';
import ContentEditable from 'react-contenteditable';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commText : this.props.comm.text,
            canChange: false
        }
    }

    render() {
        return (
            <Media body>
                <Media heading className="subtitle">{this.props.comm.author}</Media>
                <ContentEditable
                    html={this.state.commText}
                    disabled={this.props.comm.author!==this.props.logger && !this.state.canChange}
                    onFocus={() => {this.setState({canChange:true})}}
                    onBlur={() => {this.setState({canChange:false})}}
                    onChange={(e) => {this.setState({commText: e.target.value})}}
                    tag="article"
                />
                <p>-- {(new Date(this.props.comm.date)).toLocaleDateString('en-US',  { year: 'numeric', month: 'short', day: '2-digit' })}</p>
                {this.props.comm.author===this.props.logger && <Button size="sm" className="mr-2" color='secondary' onClick={() => this.setState({commText: this.props.comm.text})}>Undo Edit</Button>}
                {this.props.comm.author===this.props.logger && <Button size="sm" color='primary' onClick={() => 
                                        this.props.editComment(this.state.commText, this.props.postId, this.props.comm.commentId)}>Upload Edit</Button>}
            </Media>
        );
    }
}

class RenderComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentText:'',
            isCommentsOpen: true
        }

        this.toggleComments = this.toggleComments.bind(this);
    }

    toggleComments() {
        this.setState({isCommentsOpen : !this.state.isCommentsOpen});
    }

    render() {
        return (
            <div>
                <div className="row mt-3">
                    <InputGroup className="col-10">
                        <Input type="textarea" name="comment" id="comment" placeholder="add comment" rows="1"
                        onChange={(e) => this.setState({commentText:e.target.value}) }/>
                    </InputGroup>
                <Button className="col"  color="primary" onClick={() => this.props.addComment(this.state.commentText, this.props.post._id)}>Comment</Button>
                </div>
                <div className="mt-3">
                    <Button outline color="success" size="sm" onClick={this.toggleComments} style={{ marginBottom: '1rem' }}><i className="fas fa-toggle-on fa-lg"></i></Button>
                    <Collapse isOpen={this.state.isCommentsOpen}>
                        <ListGroup>
                            {this.props.post.comments.map((comm) => {
                                return(
                                <ListGroupItem key={comm.commentId}>
                                    <Comment comm={comm} logger={this.props.logger} postId={this.props.post._id} 
                                    editComment={this.props.editComment} />
                                </ListGroupItem>);
                            })}
                        </ListGroup>
                    </Collapse>
                </div>
            </div>
        )
    }
}


class Post extends Component {
    constructor(props) {
        super(props);
        //this.contentEditable = React.createRef();

        this.state = {
            postText : this.props.post.text,
            canChange: false
        } 

        //this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <>
            <Media className="mb=3">
                {this.props.post.img && 
                <Media left href="#" className="mr-2">
                    <Media object width="120px" src={this.props.post.img} alt="Generic placeholder image" />
                </Media>}
                <Media body>
                    <Media heading className="title">
                        {this.props.post.author}
                    </Media>
                    <ContentEditable className="postbody"
                        html={this.state.postText}
                        disabled={this.props.post.author!==this.props.logger && !this.state.canChange}
                        onFocus={() => {this.setState({canChange:true})}}
                        onBlur={() => {this.setState({canChange:false})}}
                        onChange={(e) => {this.setState({postText: e.target.value})}}
                    />
                </Media>
            </Media>
            <div>
                <p>-- {(new Date(this.props.post.date)).toLocaleDateString('en-US',  { year: 'numeric', month: 'short', day: '2-digit' })}</p>
                {this.props.post.author===this.props.logger && <Button color='secondary' className="mr-2" onClick={() => this.setState({postText: this.props.post.text})}>Undo Edit</Button>}
                {this.props.post.author===this.props.logger && <Button color='primary' onClick={() => this.props.editArticle(this.state.postText, this.props.post._id)}>Upload Edit</Button>}
                <RenderComments post={this.props.post} logger={this.props.logger}
                                addComment={this.props.addComment}
                                editComment={this.props.editComment} />
            </div>
            </>             
        )
    }
}

class RenderPosts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroup className="border-0">
                {this.props.posts.map((post) => {
                    return (
                        <ListGroupItem key={post._id}>
                            <Post post={post} logger={this.props.logger} 
                                    editArticle={this.props.editArticle}
                                    addComment={this.props.addComment}
                                    editComment={this.props.editComment}
                                     />
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        )
    }
}

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPosts: this.props.posts,
            keyword: '',
            doSelect: false
        }

        this.select = this.select.bind(this);
    }

    select = () => {
        if (this.state.keyword) {
            this.setState({doSelect: true})
            this.setState({selectedPosts: this.props.posts.filter((post) => {
                return post.text.includes(this.state.keyword.trim()) || post.author.includes(this.state.keyword.trim())
            })})
        }
    }

    unselect = () => {
        this.setState({selectedPosts: this.props.posts, keyword: '', doSelect: false});
        document.getElementById("searchWord").value = '';
    }

    render() {
        return (
            <div className="block-example border border-secondary p-3">
                <InputGroup className='mb-2'>
                    <Input placeholder="search here" id="searchWord" onChange={e => this.setState({keyword:e.target.value})}/>
                    <InputGroupAddon addonType="append">
                        <Button color="success" onClick={() => this.select()}><i className="fas fa-search"></i></Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => this.unselect()}><i className="fas fa-times"></i></Button>
                    </InputGroupAddon>
                </InputGroup>
                <RenderPosts posts={this.state.doSelect ? this.state.selectedPosts:this.props.posts} logger={this.props.logger} 
                            editArticle={this.props.editArticle}
                            addComment={this.props.addComment}
                            editComment={this.props.editComment} />
            </div>
        )
    }
}

export default Posts;