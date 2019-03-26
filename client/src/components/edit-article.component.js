import React, { Component } from 'react';
import axios from 'axios';
import './create.css';

//Class that displays the option to comment on an article
export default class EditArticle extends Component {
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
                article_id: ''
                }
            ],
            article_id: 0,
            articles:[]
        }

        this.onChangeComment = this.onChangeComment.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

    }

    //changes the state of the comments body whenever the input box is changed
    onChangeComment(e) {
        this.setState({
            com_body: e.target.value
        })
    }

    //changes the state of the comments author whenever the input box is changed
    onChangeName(e) {
        this.setState({
            com_author: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        let date = new Date();
        console.log(this.props);
        const newComment ={
            com_author: this.state.com_author,
            com_body: this.state.com_body,
            com_date: date.toLocaleDateString('en-US'),
            article_id: this.props.edit.article._id
        };
        axios.post('http://localhost:4000/articles/addComment', newComment)
        .then(res => {
            console.log(res.data)
            window.location.reload()
            
        });
    }

    render() {
        return (
            <div>
                <h5>Feedback</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Comment:</label>
                        <br></br>
                        <input type="text"value={this.state.article_comments.com_body} onChange={this.onChangeComment}></input>
                        <br></br>
                        <label>Name: </label>
                        <br></br>
                        <input type="text"value={this.state.article_comments.com_author} onChange={this.onChangeName}></input>
                    </div>
                    <input type="submit" name="articleSubmit" className="articlesubmit"></input>
                
                </form>
                <hr></hr>
                
            </div>
        )
    }
}