/// - Kullanıcılar şeması modülü
const UsersSchema = require('../../Schemas/UsersSchema/UsersSchemas');
const bcrypt = require('bcrypt')
const send_mail = require('../../Mail/PasswordChangeMail');
const send_email_token = require('../../Mail/SendRegisterMail')
/// - Random oluşturma Modülü
const crypto = require('crypto-random-string');/**
 * @function user_profile: Kullanıcı bilgilerini bulur
 * @param {*} to : Kullanıcının id 'si
 */

exports.user_profile = function user_profile(to,socket){
    return new Promise((resolve,reject)=>{
            const ProfileSchema = new UsersSchema({},{collection:'users'})
            const Profile = ProfileSchema.model('users',ProfileSchema)
            Profile.find({_id:to})
            .select({email_token:0,password:0,__v:0})
            .populate({
                path: 'followers',
                match:{account_status:{$eq: 0}},
                select: process.env.populate_path_follows_followers_select
              })
              .populate({
                path: 'follows',
                match:{account_status:{$eq: 0}},
                select: process.env.populate_path_follows_followers_select
              })
            .exec((e,user_profile_result)=>{
                resolve(socket.emit('Profile',user_profile_result))
                
            })
           
    })
}

exports.upload_avatar = function change_avatar(to,avatar_link){
    return new Promise((resolve,reject)=>{
        const ProfileSchema = new UsersSchema({},{collection:'users'})
        const Profile = ProfileSchema.model('users',ProfileSchema)
        Profile.findByIdAndUpdate(to,{avatar_link : avatar_link},{new:true})
        .then(change_avatar_result=>{resolve(change_avatar_result)})
        .catch(change_avatar_error=>{reject(change_avatar_error)})
    })
 
}
/**
 * @function rewarded_ad : Kazanılan altını veritabanına yazan program
 * @param {*} to : Kullanıcı id si 
 * @param {*} user_gold  : Kullanıcının kazandığı altın
 */
exports.rewarded_ad = function rewarded_ad(to,user_gold){
    return new Promise((resolve,reject)=>{
        const ProfileSchema = new UsersSchema({},{collection:'users'})
        const Profile = ProfileSchema.model('users',ProfileSchema)
        Profile.findByIdAndUpdate(to,{$inc:{user_gold:user_gold}},{new:true})
        .then(rewarded_ad_result=>{resolve(rewarded_ad_result)})
        .catch(crewarded_ad_error=>{reject(crewarded_ad_error)})
    })
}
/**
 * 
 * @param {*} to  : Kullanıcı id si
 * @param {*} currentPassword  : Kullanıcı mevcut şifresi
 * @param {*} newPassword  : Kullanıcı yeni şifresi
 */
exports.current_password_valid= async function current_password_valid(to,currentPassword){
    return new Promise((resolve,reject)=>{
        const ChangePasswordProfileSchema = new UsersSchema({},{collection:'users'})
        const ChangePassword = ChangePasswordProfileSchema.model('users',ChangePasswordProfileSchema)
        ChangePassword.find({_id:to})
        .then(async find_user_result => {
            const userpassword = find_user_result[0].password
            const password_valid = await bcrypt.compare(currentPassword,userpassword)
            if (password_valid == true) {
                resolve(password_valid)
            }else{
                reject({status:404,message:"PF"})
            }
        })
    })
}
/**
 * @function change_password : Kullanıcı parolarsını değiştirir
 * @param {*} to  : Kullanıcı id si
 * @param {*} currentPassword  : Kullanıcı mevcut şifresi
 * @param {*} newPassword  : Kullanıcı yeni şifresi
 */
exports.change_password =  function change_password(to,newPassword){
    return new Promise(async (resolve,reject)=>{
        const ChangePasswordProfileSchema = new UsersSchema({},{collection:'users'})
        const ChangePassword = ChangePasswordProfileSchema.model('users',ChangePasswordProfileSchema)
        const password_hash = await bcrypt.hash(newPassword,10)
        ChangePassword.findByIdAndUpdate(to,{password:password_hash})
        .then(async change_password_result=>{
          
            await send_mail(change_password_result.email,newPassword)
            await resolve({status:200,message:"CP"})
        })
        .catch(change_password_error=>{reject(change_password_error)})
    })
}

/**
 * @function email_token_send : Token gönderilecek kişiyi bulur
 * @param {*} to : Kullanıcı id si
 */
exports.email_token_send = function email_token_send(to){
    return new Promise(async (resolve,reject)=>{
    const UserSchema = new UsersSchema({},{collection:'users'})
    const EmailToken = UserSchema.model('users',UserSchema)
    EmailToken.find({_id:to})
    .select({email_token : 1,email:1})
    .then(async find_user_result => {
        await send_email_token(find_user_result[0].email,find_user_result[0].email_token)
    })
    .catch(find_user_error => {reject(find_user_error)})
    })
}
/**
 * @function change_email : Email değiştirme fonksiyonu
 * @param {*} to  : Kullanıcı id'si
 * @param {*} email  : Kullanıcı email adresi
 */
exports.change_email = function change_email(to,email){
    return new Promise(async (resolve,reject)=>{
    const mail_token =  crypto({length: 40,type:'alphanumeric'});
    const UserSchema = new UsersSchema({},{collection:'users'})
    const EmailToken = UserSchema.model('users',UserSchema)
    EmailToken.findOneAndUpdate({_id:to},{email:email,email_confirmed:false,email_token:mail_token},{new:true})
    .then(async email_change_result=>{
        await send_email_token(email_change_result.email,email_change_result.email_token)
        await resolve(email_change_result)
    })
    .catch(email_change_error=>{reject(email_change_error)})
    
})
}

exports.hidden_status = function hidden_status(to,hidden_status){
    return new Promise(async (resolve,reject)=>{
        const UserSchema = new UsersSchema({},{collection:'users'})
        const HiddenStatus = UserSchema.model('users',UserSchema)
        HiddenStatus.findOneAndUpdate({_id:to},{hidden_status:hidden_status},{new:true})
        .then(hidden_status_result=>{resolve(hidden_status_result)})
        .catch(hidden_status_error=>{reject(hidden_status_error)})

    })
}
exports.hidden_discovery = function hidden_discovery(to,hidden_discovery){
    return new Promise(async (resolve,reject)=>{
        const UserSchema = new UsersSchema({},{collection:'users'})
        const HiddenStatus = UserSchema.model('users',UserSchema)
        HiddenStatus.findOneAndUpdate({_id:to},{hidden_discovery:hidden_discovery},{new:true})
        .then(hidden_discovery_result=>{resolve(hidden_discovery_result)})
        .catch(hidden_discovery_error=>{reject(hidden_discovery_error)})

    })
}
exports.hidden_birtdate = function hidden_birtdate(to,hidden_birtdate){
    return new Promise(async (resolve,reject)=>{
        const UserSchema = new UsersSchema({},{collection:'users'})
        const HiddenStatus = UserSchema.model('users',UserSchema)
        HiddenStatus.findOneAndUpdate({_id:to},{hidden_birtdate:hidden_birtdate},{new:true})
        .then(hidden_discovery_result=>{resolve(hidden_discovery_result)})
        .catch(hidden_discovery_error=>{reject(hidden_discovery_error)})

    })
}
exports.delete_account = function delete_account(to){
    return new Promise(async (resolve,reject)=>{
        const UserSchema = new UsersSchema({},{collection:'users'})
        const HiddenStatus = UserSchema.model('users',UserSchema)
        HiddenStatus.findByIdAndDelete(to)
        .then(hidden_discovery_result=>{resolve(hidden_discovery_result)})
        .catch(hidden_discovery_error=>{reject(hidden_discovery_error)})

    })
}