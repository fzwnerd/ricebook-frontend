import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Button, InputGroup, Input  } from 'reactstrap';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showImage: false,
            imageFile: null,
            //postText : ''
        }

        this.handleImageChange = this.handleImageChange.bind(this);
        //this.postImage = this.postImage.bind(this);
        this.clearPost = this.clearPost.bind(this);
        this.uploadPs = this.uploadPs.bind(this);

    }

    handleImageChange = e => {
        let reader = new FileReader();
        let file = e.target.files[0];

        if (file) {
            this.setState({showImage:true});
            this.setState({imageFile: file});
            reader.onload = function(event) {           
                document.getElementById('postimg').src = event.target.result;
            }
            reader.readAsDataURL(file);

         //const fd = new FormData();
         //fd.append('image', file);
         //this.setState({newAvatar:fd});
        }
    }

    clearPost = () => {
        document.getElementById('posttext').value = null;
        this.setState({showImage:false, imageFile: null});
    }

    uploadPs = () => {
        var postText = document.getElementById('posttext').value;
        if (postText) {
            const fd = new FormData();
            fd.append('text', postText);
            if (this.state.imageFile) {
                fd.append('image', this.state.imageFile);
            }
            this.props.uploadPost(fd);
            this.clearPost();
        }
    }

    render() {
        return (
            <div className="container block-example border border-success">
                <div className="row">
                    <div className="col-12">
                        <h5 className="text-info">Say Something</h5>
                    </div>
                    <div className="col-12 col-md-5">
                        <Card>
                            {this.state.showImage && <CardImg top width="100%" src={this.state.imageSrc} id="postimg"
                                                    alt="postimage" /> }            
                            <CardBody>
                                <InputGroup>
                                    <Input type="file" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>       
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md">
                        <textarea className="form-control rounded-1" id="posttext" rows="10"
                                                placeholder="Enter text here"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-2">
                            <Button color="secondary" className="mr-2" onClick={() => this.clearPost()} >Clear</Button>  
                            <Button color="primary" onClick={() => this.uploadPs()} >Post</Button>   
                    </div>
                </div>
            </div>
        );
    }
}
export default Upload;