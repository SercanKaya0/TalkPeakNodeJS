/// - Veri tabanı bağlantı modülü
const mongoose = require('mongoose');
/// - Bilgileri Gizleme Modülü
const dontEnv = require('dotenv').config();
/// - Veri tabanı bağlantısı
mongoose.connect(process.env.USERMONGODB, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true, useFindAndModify : false})
.then(response=>{console.log('⚙️ USERSETTINGSSCHEMA.JS: MongoDB Connected');})
.catch(error=>{console.log(error)});

const UserSettings = new mongoose.Schema({
    to : {type :String,trim:true,required:true},
    from : {type :String,trim:true,required:true},
    is_follow : {type :Boolean,trim:true},
    is_blocked : {type :Boolean,trim:true}

},{timestamps:true});



module.exports = mongoose.model('user_settings',UserSettings)