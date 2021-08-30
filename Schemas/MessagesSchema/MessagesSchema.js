/// - Veri tabanı bağlantı modülü
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
/// - Bilgileri Gizleme Modülü
const dontEnv = require('dotenv').config();
/// - Veri tabanı bağlantısı
mongoose.connect(process.env.USERMONGODB, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true, useFindAndModify : false})
.then(response=>{console.log('✉ MESSAGESSCHEMAS.JS: MongoDB Connected');})
.catch(error=>{console.log(error)});
var minuteFromNow = function(){
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60 * 100);
    return timeObject;
};

const Messages = new mongoose.Schema({
    to : {type :String,trim:true,required:true},
    from : {type :String,trim:true,required:true},
    message : {type:String,trim:true,minlength:1},
    send_time : {type:String,trim:true,required:true},
    send_date : {type:String,trim:true,required:true},
    message_type: {type: String,enum:["text","image","gif","gift"],required:true},
    gift : {type:String,trim:true,minlength:1},
    name : {type:String,trim:true},
    price : {type:Number,trim:true},
    photo : {type:String,trim:true,minlength:1},
    from_information : {type:ObjectId,ref: 'users',required:true}

},{timestamps:true});



module.exports = mongoose.model('messages',Messages)