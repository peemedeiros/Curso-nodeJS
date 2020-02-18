const mongoose = require('mongoose');
const slug = require('slug');

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

postSchema.pre('save', function(next){

    if(this.isModified('title')){
        this.slug = slug( this.title, {lower:true} );
    }

    next();
});

module.exports = mongoose.model('Post', postSchema);