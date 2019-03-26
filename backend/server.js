const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const articleRoutes = express.Router();

let Article = require('./article.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/articles', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//original route to main page
articleRoutes.route('/').get(function(req, res) {
    Article.find(function(err, articles) {
        if (err) {
            console.log(err);
        } else {
            res.json(articles);
        }
    });
});

//request to get article based on ID
articleRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Article.findById(id, function(err, article) {
        res.json(article);
    });
});

//Update an article based on ID, not currently in use
articleRoutes.route('/update/:id').post(function(req, res) {
    Article.findById(req.params.id, function(err, article) {
        if (!article)
            res.status(404).send("data is not found");
        else
            article.article_title = req.body.article_title;
            article.article_body = req.body.article_body;
            article.article_author = req.body.article_author;
            article.article_date = req.body.article_date;
            article.article_likes = req.body.article_likes;
            article.article_comments = req.body.article_comments;

            article.save().then(todo => {
                res.json('article updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//add an article to database
articleRoutes.route('/add').post(function(req, res) {
    let article = new Article(req.body);
    article.save()
        .then(article => {
            res.status(200).json({'article': 'article added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new article failed');
        });
});

//add a comment to a specific article on ID
articleRoutes.route('/addComment').post(function(req, res) {
    //construct a new comment from input
    let comment = {
        com_author: req.body.com_author,
        com_body: req.body.com_body,
        com_date: req.body.com_date,
        article_id: req.body.article_id
    }

    //find article in database with the given ID
    Article.findById(comment.article_id, function(err, article) {
        console.log(err,article);
        article.article_comments.push(comment); //push new comment to article array of comments

    
     article.save()
        .then(article => {
            console.log("save succeeded")
            res.status(200).json({article});
        })
        .catch(err => {
            console.log("save failed")
            console.log(err)
            res.status(400).send('adding new article failed');
        });

        
    });
    
});

//request to delete an article based on ID
articleRoutes.route('/delete:id').delete(function(req, res) {
    let id = req.params.id;
    Article.findById(id, function(err, article) {
        article.remove()
            .then(article => {
                res.status(200).json({'article': 'article removed successfully'});
            })
            .catch(err => {
                res.status(400).send('removing article failed');
            });
    });
});



app.use('/articles', articleRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});