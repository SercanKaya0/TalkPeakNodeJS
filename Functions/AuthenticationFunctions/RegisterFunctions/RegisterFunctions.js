// /// - Kullanıcılar şema modülü 
// const UserSchemas = require('../../../Schemas/UsersSchema/UsersSchemas');
// /// - Şifre hash Modülü
// const bcrypt = require('bcrypt')
// /// - Random oluşturma Modülü
// const crypto = require('crypto-random-string');
// /// - Kayıtt olan kullanıcıya mail gönderir
// const register_mail = require('../../../Mail/SendRegisterMail')

// /**
//  * @function register_user : Kullanıcı Kayıt etme fonksiyonu
//  * @param {email,password} : Clientten gelen Kullanıcının email adresi ve şifresini 
//  * @param {*} hasspassword : Kullanınıcın şifresini hashler
//  * @param {*} mail_token   : Random bir mail anahtarı oluşturur
//  * @param {*} anonim_id    : Kullanıcıya random bir anonim id oluşturur.
//  * @param {*} save_data    : Veri tabanına kayıt edilecek veriler
//  * @param {0} save_user_result : Eğer kayıt başarılı ise Kayıt olan kullanıcının sonuçlarını gösterir.
//  * @param {*} save_user_error : Kullanıcı kayıt işlemi başarısız olursa hata gösterir
//  * @param {*} RF : Regiter Failed := Kayıt işlemi başarısız
//  */

// exports.register_user = async function register_user(email,password){
//     return new Promise(async (resolve,reject)=> {
//         const hash_password = await bcrypt.hash(password,10)
//         const mail_token =  crypto({length: 40,type:'alphanumeric'});
//         const anonim_id = crypto({length:30,type:'alphanumeric'})
//         const save_data = {email : email,password:hash_password,email_token: mail_token,anonim_id:`Anonim-${anonim_id}`}
//         const save_user =  new UserSchemas(save_data)
//         save_user.save()
//         .then(save_user_result=>{resolve({status:200,message:"Success",_id:save_user_result._id})})
//         .catch(save_user_error=>{reject({status:404,message:"RF"})})
//     })
// }


// exports.email_confirmed = function email_confirmed(email_token){
//     return new Promise(async (resolve,reject)=>{
//     const UserSchema = new UserSchemas({},{collection:'users'})
//     const EmailToken = UserSchema.model('users',UserSchema)
//     EmailToken.findOneAndUpdate({email_token:email_token},{email_token:"confirmed",email_confirmed:true},{new:true})
//     .select({email_token:1})
//     .then(email_confirmed_result=>{
//         if (email_confirmed_result.email_token == "confirmed"){
//             resolve("Success")
//         }
//     })
//     .catch(email_confirmed_error => {reject("Error")})
// })
// }

