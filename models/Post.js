const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true, //remove os espacos do inicio e do final da string
        required:'Titulo obrigatorio',

    },
    slug:String,
    body:{
        type:String,
        trim:true,

    },
    tags:[String]
});

module.exports = mongoose.model('Post', postSchema);