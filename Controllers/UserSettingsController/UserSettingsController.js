const setting_functions = require('../../Functions/UserSettingsFunctions/UserSettingsFunctions')
const change_settings = require('../../ChangeStream/UserSettingChangeStream/UserSettingChangeStram')
module.exports = {
    settings : async (socket)=>{
        try{
        socket.on('to',async (data)=>{
           await setting_functions.user_settings_socket(data["to"],data["from"],socket)
            await change_settings(data["to"],data["from"],socket)

        })  
        }catch (error){
            console.log(error);
        }
        
    }

}