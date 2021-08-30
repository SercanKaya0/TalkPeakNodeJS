// /// - Kullanıcılar şema modülü 
// const UserSchemas = require('../../../Schemas/UsersSchema/UsersSchemas');

// /**
//  * @function register_complete : Kullanıcı kayıt tamamlama fonksiyonu
//  * @param {*} request : clientten gelen verileri yakalama 
//  */
// exports.register_complete = function register_complete(request){
//     return new Promise((resolve,reject)=>{
//     /// - Clientten gelen verileri yakalama
//     const {username,country,gender,birtdate,_id} = request.body
//     const register_completed = new UserSchemas({},{collection:'users'});
//     const Register_Complete = register_completed.model('users',register_completed)
//     Register_Complete.findOneAndUpdate({_id:_id},{username : username,country:country,gender:gender,birtdate:birtdate,register_status:1},{new:true})
//     .then(register_complete_result=>{resolve({status:200,message:'Success Complete'})})
//     .catch(register_complete_error=>{reject({status:404,message:'NURC'})})

//     })
// }