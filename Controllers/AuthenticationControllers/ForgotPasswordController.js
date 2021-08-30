/// - Şifreleme Modülü
const bcrypt = require('bcrypt');
/// - Kullanıcılar Şema Modülü
const UsersSchemas = require('../../Schemas/UsersSchema/UsersSchemas');
/// - Rastegele String üretme modülü
const crypto = require('crypto-random-string');
/// - Yeni şifre mail gönderme modülü
const SendMailNewPassword = require('../../Mail/SendPasswordMail')
module.exports = {
    password_forgot : async (request,response) => {
        /// - Gelen veri
        const {email,username} = request.body
        const Forgot = new UsersSchemas({},{collection:'users'});
        const ForgotPassword = Forgot.model('users',Forgot)
        /// - Random şifre üretme
        const RandomPassword =  await crypto({length: 10,type:'alphanumeric'});
        /// - Random şifre Koruması
        const hashPassword = await bcrypt.hashSync(RandomPassword,10);
        /// - Kullanıcı databasede arama ve şifre güncelleme
        ForgotPassword.findOneAndUpdate({},{password:hashPassword},{new:true})
        /// - Email veya Kullanıcı adı eşit olan kullanıcı
        .or([{email:email},{username:username}])
        /// - Gelecek veriyi filtreleme
        .select({email:1,email_confirmed:1})
        /// - Gelen Sonuçları Görme
        .then(PasswordForgotResult=>{
           if (PasswordForgotResult == null){
               /// - UNW = User Not Found 
            response.send({status:404,message:'UNF'})
           }else{
               /// - Eğer Email adresi doğrulanmadı ise
               if (PasswordForgotResult["email_confirmed"] == false){
                   /// - NCE = Not Confirmed Email
                response.send({status:404,message:'NCE'})
               }else{
                /// - CESE = Change Email and Send Email
                response.send({status:200,message:'CESE'})
                const user_email = PasswordForgotResult["email"]
                /// - Değişen Şifreyi Email olarak gönderme
                SendMailNewPassword(user_email,`${RandomPassword}`)
               }
           }
        })

    }
}