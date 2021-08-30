/// - Users Schamasında Arama yapma modülü
const Signin_functions = require('../../Functions/AuthenticationFunctions/SigninFunctions/SigninFunctions')
/// - Kullanıcı kayıt olma fonksiyonları modülü
const Register_user = require('../../Functions/AuthenticationFunctions/RegisterFunctions/RegisterFunctions')
/// - Kullanıcı kayıt tamamlama fonksiyonlar modülü
const Register_complete = require('../../Functions/AuthenticationFunctions/RegisterCompleteFunctions/RegisterCompleteFunctions')
module.exports = {
login : async (request,response) => {
//         try {
//        /// - Gelen değerleri yakalama
//        const {email,username,password} = request.body
//        const find_users = await Signin_functions.find_users(email,username);
//         const password_validate = await Signin_functions.password_validate(find_users,password);
//         if (password_validate["message"] = 'VP'){
//         const connection_status = await Signin_functions.connection_status(find_users[0]._id);
//         const send_response = await Signin_functions.response_sign_in(email,username)
//         await response.send(send_response);
//         }
//         }catch (error) {
//         response.send(error)
//         }

},
register : async (request,response) => {
        // try{
        //  /// - Gelen değerleri yakalama
        // const {email,password} = request.body
        //  const register_user = await Register_user.register_user(email,password);
        //  const response_send = await response.status(200).send(register_user)
        // }catch (error) {
        // response.status(404).send(error)
        // }
 
},
register_complete : async (request,response) => {
        // try{
        // const register_completed = await Register_complete.register_complete(request);
        // await response.status(200).send(register_completed)
        // }catch (error) {
        // response.status(404).send(error)
        // }
 
} ,
email_confirmed :  async (request,response)=>{
        try{
            const {email_token} = request.query
            const email_confirmed = await Register_user.email_confirmed(email_token)
            console.log(email_confirmed);
           if (email_confirmed == "Success"){
              return response.redirect("https://talkpeak.online/index.html")
           }
        }catch (error){
          response.send(error);
          }
    } 
}
