const User_profile = require('../../Functions/UserProfileFunctions/UserProfileFunctions')
const User_profile_change = require('../../ChangeStream/UserProfile/UserProfileChangeStream')

module.exports = {
    userProfile : async (socket)=>{
        socket.on('Profile',async (to)=>{
            try {
              await User_profile.user_profile(to,socket); 
              await User_profile_change(to,socket);
            }catch (error){
                console.log(error);
            }
        })
},
rewarded_ad : async (request,response)=>{
    try{
        const {to,user_gold} = request.body
        console.log(to);
        const user_gold_update = await User_profile.rewarded_ad(to,user_gold)
        await response.send(user_gold_update)
    }catch (error){
                console.log(error);
            }
},
change_password : async (request,response)=>{
    try{
        const {to,currentPassword,newPassword} = request.body
        const password_change = await User_profile.current_password_valid(to,currentPassword)
        if (password_change == true){
            await User_profile.change_password(to,newPassword)
        }
    }catch (error){
      response.send(error);
      }
},
send_email_token : async (request,response)=>{
    try{
        const {to} = request.body
        const find_user = await User_profile.email_token_send(to);
    }catch (error){
      response.send(error);
      }
},
change_email : async (request,response)=>{
    try{
        const {to,email} = request.body
        const change_email = await User_profile.change_email(to,email)
    }catch (error){
      response.send(error);
      }
},
hidden_status : async (request,response)=>{
    try{
        const {to,hidden_status} = request.body
        const hidden_status_result = await User_profile.hidden_status(to,hidden_status)
        await response.send("Success")
    }catch (error){
      response.send(error);
      }
},
hidden_discovery: async (request,response)=>{
    try{
        const {to,hidden_discovery} = request.body
        const hidden_discovery_result = await User_profile.hidden_discovery(to,hidden_discovery);
        await response.send("Success")
    }catch (error){
      response.send(error);
      }
},
hidden_birtdate: async (request,response)=>{
    try{
        const {to,hidden_birtdate} = request.body
        const hidden_birtdate_result = await User_profile.hidden_birtdate(to,hidden_birtdate);
        await response.send("Success")
    }catch (error){
      response.send(error);
      }
},
delete_account: async (request,response)=>{
    try{
        const {to} = request.body
        const delete_account = await User_profile.delete_account(to);
        await response.send("Success")
    }catch (error){
      response.send(error);
      }
},
}