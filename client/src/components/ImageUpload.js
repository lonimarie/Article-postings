import React, {Component} from 'react';
import {storage} from '../firebase';

//Not currently being used, option to upload an image using firebase
class ImageUpload extends Component {
    constructor(props) {
        super(props);
            this.state = {
                image: null,
                url: ''
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleUpload = this.handleUpload.bind(this);
        
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) = { 
            //progress 
        }, (error) => {
                //error
                console.log(error);
        }, () => {
            //complete
            storage.ref('images').child('image.name').getDownloadURL().then(url => {
                console.log(url);
            })
        });
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() =>({image}));

        }
    }

    render() {

        return(
            <div>
                <input type="file" onChange={this.handleChange}></input>
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        )
    }
}

export default ImageUpload;