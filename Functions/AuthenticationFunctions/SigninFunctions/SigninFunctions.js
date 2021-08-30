// /// - Kullanıcılar şema modülü 
// const UserSchemas = require('../../../Schemas/UsersSchema/UsersSchemas');
// /// - Şifre hash Modülü
// const bcrypt = require('bcrypt')
// /**
//  * 
//  * @function find_users : Kullanıcılar şemasında, email ve username göre arama yapan fonskyiondur.
//  * @param {email,username} : Clientten gelen kullanıcı adı ve email adresi
//  * @param {HBS} : Hesabınız askıya alınmıştır kısaltması
//  * @param {HBC} : Hesabınız kapatılmştır
//  */
// exports.find_users = function find_user(email,username){
// return new Promise((resolve,reject)=>{
//     /// - Database kullanıcı Doğrulama
//     const Sign_in = new UserSchemas({},{collection:'users'});
//     const SignIn = Sign_in.model('users',Sign_in)
//     /// - Database Kullanıcı Arama
//     SignIn.find()
//     /// - Kullanıcı Adı ve ya Email adresi eşit olan kullaıcıları bulma
//     .or([{username:username},{email:email}])
//     .select({account_status:1,_id:1,register_status:1,user_gold:1,password:1})
//     /// - Bulunan Sonuçları görme
//     .then(Sign_in_result =>{
//     if(Sign_in_result.length != 0) {
//     if(Sign_in_result[0].account_status == 0){
//         resolve(Sign_in_result)
//     }else if (Sign_in_result[0].account_status == 1) {
//         reject({status:404,message:"HBS"})
//     }else if (Sign_in_result[0].account_status == 2){
//         reject({status:404,message:"HBC"})
//     }
//     }else {
//         reject({status: 404,message : 'UNF'})
//     }

//     })
//     .catch(Sign_in_error=>{reject(Sign_in_error)})
// })
// }
// /**
//  * @function password_validate : Kullanıcın kayıtlı hashlenmiş parolası ile clientten gelen parolayı karşılaştırır. True veya false sonucuna göre işlem yapar
//  * @param {*} find_user : Kullanıcılar şemasında bulunan kullanıcının bilgilerini içerir.
//  * @param {*} password  : Clientten gelen şifre
//  * @param {*} UPW : Kullanıcı şifresi hatası, User password Wrong kısaltması
//  * @param {*} UNF : Kullanıcı bulunamadı hatası : User Not Found kısaltması
//  * @param {0} VP : Şifre doğrulama işlemi başarılı
//  */
// exports.password_validate = async function password_validate(Sign_in_result,password){
//     return new Promise(async (resolve,reject)=> {
//             const userpassword = Sign_in_result[0].password
//             /// - Korumalı şifre doğrulayıcı
//             const password_valid = await bcrypt.compare(password,userpassword)
//             /// - Korumalı şifre doğrulama sonucu
//             if (password_valid == false) {
//             reject({status: 404,message : 'UPW'})
//            }else {
//              resolve({status:200,message:'VP'})
//            }
      
//     })
// }

// exports.connection_status = function connection_status_update(_id){
//     return new Promise((resolve,reject) => {
//   /// - Database kullanıcı Doğrulama
//   const Sign_in = new UserSchemas({},{collection:'users'});
//   const SignIn = Sign_in.model('users',Sign_in)
//   SignIn.findByIdAndUpdate(_id,{connection_status:true})
//     .then(Connection_status_result =>{resolve(Connection_status_result)})
//     .catch(Connection_status_error=>{reject(Connection_status_error)})
//     })
// }

// exports.response_sign_in = function response_sign_in(email,username){
//     return new Promise((resolve,reject)=>{
//         /// - Database kullanıcı Doğrulama
//         const Sign_in = new UserSchemas({},{collection:'users'});
//         const SignIn = Sign_in.model('users',Sign_in)
//         /// - Database Kullanıcı Arama
//         SignIn.find()
//         /// - Kullanıcı Adı ve ya Email adresi eşit olan kullaıcıları bulma
//         .or([{username:username},{email:email}])
//         .select({_id:1,user_gold:1,register_status:1,user_type:1})
//         /// - Bulunan Sonuçları görme
//         .then(Sign_in_result =>{resolve(Sign_in_result)})
//         .catch(Sign_in_error=>{reject(Sign_in_error)})
//     })
// }