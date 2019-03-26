const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Info schema using mongoose
let Info = new Schema ({
    article_count: {
        type: Number
    }

});

module.exports = mongoose.model('Info', Info);