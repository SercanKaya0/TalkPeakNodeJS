/// - MongoDB modülü
const mongo = require('mongoose')
/// - MongoDB modülü değişen verileri dinleme ayarı
const connect = mongo.connection
const { ObjectId } = require('mongoose').Types.ObjectId;
/// - Kullanıcının gönderdiği mesajlarda bir değişişlik var mı dinleme fonksiyonu
const User_profile = require('../../Functions/UserProfileFunctions/UserProfileFunctions')


/**
 * @function user_profile_change : Kullanıcı bilgilerindeki değişiklikleri dinler.
 * @param {*} to : Kullanıcı id si 
 */
const user_profile_change = function user_profile(to,socket){
return new Promise((resolve,reject)=>{
    const change_profile = connect.collection('users').watch([{$match:{'fullDocument._id':ObjectId(to)}},{"$project":{'fullDocument.__v':0,'fullDocument.password':0,'fullDocument.email_token':0}}],{fullDocument : 'updateLookup'})
    change_profile.on('change',(change)=>{
        if (change){
            resolve(User_profile.user_profile(to,socket))
        }
   })
})
}

module.exports = user_profile_change;