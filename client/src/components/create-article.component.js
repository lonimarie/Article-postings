import React, { Component } from 'react';
import axios from 'axios';
import './create.css';
import {storage} from '../firebase';


//Class that displays the form to create an article
export default class CreateArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article_title: '',
            article_body: '',
            article_author: '',
            article_date: '',
            article_likes: 0,
            article_comments: [
                {
                    com_author: '',
                    com_body: '',
                    com_date: '',
                    article_id: 0
                }
            ],
            article_id: 0,
            article_image: "",
            image: null,
            url: '',
            progress: 0
        }

        this.onChangeArticleTitle = this.onChangeArticleTitle.bind(this);
        this.onChangeArticleBody = this.onChangeArticleBody.bind(this);
        this.onChangeArticleAuthor = this.onChangeArticleAuthor.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this
        .handleChange
        .bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    
    }


    //change the title of article
    onChangeArticleTitle(e) {
        this.setState({
            article_title: e.target.value
        });
    }

    //change the body of article
    onChangeArticleBody(e) {
        this.setState({
            article_body: e.target.value
        });
    }

    //change the author of the article
    onChangeArticleAuthor(e) {
        this.setState({
            article_author: e.target.value
        });
    }

    //change the image 
    onChangeImage(e) {
        this.setState({
            article_image: e.target.value
        });

    }

    handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({image}));
        }
      }

    //the following is called when the upload button in form is pressed
    //It uploads the image to a firebase cloud storage
    handleUpload = () => {
          const {image} = this.state;
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          uploadTask.on('state_changed', 
          (snapshot) => {
            // progrss function ....
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
          }, 
          (error) => {
               // error function ....
            console.log(error);
          }, 
        () => {
            // complete function ....
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({url: url});
            })
        });
}

    //the following is called when the submit button is pressed
    //it creates a new article eand submits it to the API in server.js
    onSubmit(e) {
        e.preventDefault();
        console.log(`Form submitted:`);
        console.log(`Article Image: ${this.state.article_image}`);
        console.log(`Article Title: ${this.state.article_title}`);
        console.log(`Article Body: ${this.state.article_body}`);
        console.log(`Article Author: ${this.state.article_author}`);
        console.log(`Article file: ${this.state.file}` )
        let date = new Date();
        
        const newArticle ={
            article_title: this.state.article_title,
            article_body: this.state.article_body,
            article_author: this.state.article_author,
            article_date: date.toLocaleDateString('en-US'),
            article_likes: 0,
            article_comments: [],
            article_image: this.state.article_image,
            file: this.state.file,
            url: this.state.url

        };
        console.log("here");
        console.log(this.state.url);

        axios.post('http://localhost:4000/articles/add', newArticle)
        .then(res => console.log(res.data));
        
        this.setState({
            article_body: '',
            article_title: '',
            article_author: '',
            article_date: '',
            article_likes: 0,
            article_comments: []
        })

        this.props.history.push('/');
        window.location.reload();
    }



    render() {
        return (
            <div className="inner-containerPost">
                <div className="header">
                    Post an article
                </div>
                {/* <form onSubmit={this.onSubmit}> */}
                    <div className="input-group">
                        <label>Title: </label>

                        <input type="text" className="form" value={this.state.article_title} onChange={this.onChangeArticleTitle}/>
                    </div>

                    <div className="input-group">
                        <label>Article: </label>
                        <textarea type="text" className="article-input" value={this.state.article_body} onChange={this.onChangeArticleBody}/>
                    </div>

                    <div className="input-group">
                        <label>Name: </label>
                        <input type="text" className="form" value={this.state.article_author} onChange={this.onChangeArticleAuthor}/>
                    </div>
                    <div className="input-group">
                    <label>Choose a Category: </label>
                    
                    <select passive="true" value={this.state.article_image} onChange={this.onChangeImage}>
                        <option value="Other">Other</option>
                        <option value="Animal">Animal</option>
                        <option value="Business">Business</option>
                        <option value="Car">Cars</option>
                        <option value="City">City</option>
                        <option value="Food">Food</option>
                        <option value="Health">Health</option>
                        <option value="Music">Music</option>
                        <option value="Nature">Nature</option>
                        <option value="Sports">Sports</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                        <option value="Weather">Weather</option>
                    </select>
                    </div>
                    <div className="input-group">
                    <label>Or upload an image</label>
                    <div className="imgPreview">
                    <div>
                        <progress value={this.state.progress} max="100"/>
                        <br/>
                        <input type="file" onChange={this.handleChange}/>
                        <button onClick={this.handleUpload}>Upload</button>
                        <br/>
                        <img src={this.state.url} alt="selectedImage"></img>
                        {/* <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/> */}
                    </div>
                    </div>
                    </div>
                    <input onClick={this.onSubmit}type="submit" name="articleSubmit" className="articleSubmit"></input>


                {/* </form> */}
            </div>
        )
    }
}