/// - Veri tabanı bağlantı modülü
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
/// - Bilgileri Gizleme Modülü
const dontEnv = require('dotenv').config();
/// - Veri tabanı bağlantısı
mongoose.connect(process.env.USERMONGODB, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true, useFindAndModify : false})
.then(response=>{console.log('🌐 USERSCHEMAS.JS: MongoDB Connected');})
.catch(error=>{console.log(error)});

/**
 * @param {0,1,2} account_status : 0 = Aktif, 1 = banlanmış, 2 = askıda
 * @param {0,1} register_status : 0 = Yeni kayıt, 1 = Kayıt işlemi tamamlanmış;
 * @param {0,1,2} user_type : 0 = Normal, 1 = Vip, 2 = Admin;
 */
const UsersSchema = new mongoose.Schema({
email : {type : String,lowercase:true,required : true,unique : true,trim : true,minlength : 5,maxlength :50},
password: {type : String,required : true,trim: true,minlength : 8,maxlength : 100},
username : {type : String,required : false,unique : true,lowercase : true,trim : true,minlength : 4,maxlength : 16,sparse:true},
account_status: {type : Number,required : true,trim : true,default : 0,enum:[0,1,2]},
register_status : {type : Number,required : true,trim : true,default : 0, enum:[0,1]},
email_confirmed: {type: Boolean,required : true,trim : true,default : false,trim : true},
email_token : {type : String,required : true,trim : true},
country: {type : String,required : false,trim : true},
gender: {type : String,required : false,trim : true},
birtdate :  {type : String,required : false,trim : true},
messages_count : {type : Number,required:true,default : 0,trim: true},
user_type :{type : Number,required : true,enum : [0,1,2],default : 0,trim : true},
connection_status : {type : Boolean,required : true,default : true},
user_gold : {type : Number,required : true,default : 100,  trim : true,},
biographi : {type : String,required : true,default : 'Benimle sohbet etmek ister misin?',trim : true,minlength : 0,maxlength : 500},
avatar_link : {type : String,required : true,trim : true,default : 'https://talkpeak.online/images/avatars/no-avatar.jpg'},
hidden_discovery : {type : Boolean,required : true,default : false},
anonim_id : {type : String,required : true,trim : true,unique : true},
follows_count : {type : Number,required : true,default : 0,trim : true},
hidden_status : {type : Boolean,default : false},
hidden_birtdate : {type : Boolean,default : false},
gifts_sent_count : {type : Number,default: 0,required: true},
gift_taken_count : { type : Number,default: 0,required: true },
gift_total_sent_price: {type : Number,default: 0,required: true},
gift_total_taken_price : {type : Number,default: 0,required: true},
is_verified : {type:Boolean,default:false},
followers_count : {type : Number, default: 0},
follows: [{type:ObjectId,ref: 'users'}],
followers:[{type:ObjectId,ref: 'users'}]

},{timestamps:true});



module.exports = mongoose.model('users', UsersSchema);