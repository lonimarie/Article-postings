import React, { Component } from 'react';
import axios from 'axios';
import Edit from './edit-article.component';
import boy from './boy.jpg';
import Animal from './animal.jpg';
import Travel from './beach.jpg';
import Cars from './cars.jpg';
import City from './city.jpg';
import Food from './food.jpg';
import Health from './health.jpg';
import Landscape from './landscape.jpg';
import Music from './music.jpg';
import Other from './other.jpg';
import Sports from './sports.jpg';
import Technology from './technology.jpg';
import Weather from './weather.jpg';
import Business from './business.jpg';


const Comment = props => (
    <div className="singleComment">
        <div className="comment">
            <img src={boy} className="avatar" alt="smoke"></img>
        </div>
        <h5>{props.comment.com_author} <span className="lighten">{props.comment.com_date}</span></h5>
        <p>{props.comment.com_body}</p>
    </div>

)
//Class that displays a single article with its comments included
export default class Article extends Component {
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
            article_image: "",
            image: null,
            url: '',
            progress: 0

        }
        this.delete = this.delete.bind(this);
        //The following else if is used to decide what image to put on top of article
        //based on what the user selected for category when creating the article
        
        if (this.props.article.url) {
            console.log(this.props.article.url);
            this.state.article_image = this.props.article.url;
        }

        else if (this.props.article.article_image === "Other") {
            this.state.article_image = Other
        } else if (this.props.article.article_image === "Animal") {
            this.state.article_image = Animal
        } else if (this.props.article.article_image === "Travel") {
            this.state.article_image = Travel
        } else if (this.props.article.article_image === "Car") {
            this.state.article_image = Cars
        } else if (this.props.article.article_image === "City") {
            this.state.article_image = City
        } else if (this.props.article.article_image === "Food") {
            this.state.article_image = Food
        } else if (this.props.article.article_image === "Health") {
            this.state.article_image = Health
        } else if (this.props.article.article_image === "Landscape") {
            this.state.article_image = Landscape
        } else if (this.props.article.article_image === "Music") {
            this.state.article_image = Music
        } else if (this.props.article.article_image === "Sports") {
            this.state.article_image = Sports
        } else if (this.props.article.article_image === "Technology") {
            this.state.article_image = Technology
        } else if (this.props.article.article_image === "Weather") {
            this.state.article_image = Weather
        } else if (this.props.article.article_image === "Business") {
            this.state.article_image = Business
        }
        else {
            this.state.article_image = Other
        }
    }  

    delete(e) {
        axios.delete('http://localhost:4000/articles/delete' + this.props.article._id)
        .then(res => {
            console.log(res.data)
            window.location.reload()
        });

    }

    render() {
        return (
           
            <div className="blog">
               

                <div className="entry">
                    <div className="center">
                        <h5>{this.props.article.article_title} <br></br> <span className="lighten">{this.props.article.article_date}</span></h5>
                </div>

                <div className="justify">
                <img src={(this.state.article_image)} alt="ArticleImage"></img>
                    <br></br>
                    <p className="center-paragraph">
                    <nbsp/> {this.props.article.article_body}
                    </p>
                    <h5 className="authorName">By: {this.props.article.article_author}</h5>
                    <br></br>
                    <br></br>
                <div className="buttonsBelow">
                    <p className="right"> <button className="button"> <b>Replies &nbsp;</b> {this.props.article.article_comments.length}</button> </p>
                    <button onClick={this.delete}className="delete">Delete</button>
                    <p className="clear"></p>
                    </div>
                <div>
                    <hr className="line"></hr>
                    <div className="comment">
                        {this.props.article.article_comments.map((item, key) =>
                            <Comment comment={item} key={key} />
                        )}
                    </div>
                </div>
                
                <Edit edit={this.props}/>
                <div>

                </div>

            </div>
        </div>
    </div>

        )
    }

}