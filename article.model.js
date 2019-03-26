const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//article schema using mongoose
let Article = new Schema({
    article_title: {
        type: String
    },

    article_body: {
        type: String
    },

    article_author: {
        type: String
    },

    article_date: {
        type: String
    },
    article_likes: {
        type: Number
    },
    article_comments: [
        {
            com_author: String,
            com_body: String,
            com_date: String,
            // article_id: String
        }
    ],

    article_image: {
        type: String
    },
    url: {
        type: String
    }
    
    


});

module.exports = mongoose.model('Article', Article);