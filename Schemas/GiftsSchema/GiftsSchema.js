const mongoose = require('mongoose');
const dontEnv = require('dotenv').config();
mongoose.connect(process.env.USERMONGODB, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true, useFindAndModify : false})
.then(response=>{console.log('🎁 GIFTSSCEHEMA.JS: MongoDB Connected');})
.catch(error=>{console.log(error)});

const allGifts = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        trim : true
    },
    image: {
        type : String,
        required : true,
        trim : true
    }


},{timestamps:true});



module.exports = mongoose.model('gifts', allGifts);