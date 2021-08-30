/// - Kullanıcıya ait mesajları getiren fonksiyon mbu modülün içerisindedir.
const get_messages_me_from = require('../../Functions/MessagesFunctions/MessagesFunctions')
/// - Kullanıcının Mesajlarındaki değişiklikleri dinleme
const change_stream_messages = require('../../ChangeStream/MessagesChangeStram/MessagesChangeStream')
module.exports = {
messages_me_from : async function(socket){
socket.on('To_From',async (data)=>{
    try{
    const mess = await get_messages_me_from.get_message_from_me(data["to"],data["from"],socket)
    await change_stream_messages.change_message_from_me(data["to"],data["from"],socket)
    }catch (error){
        console.log(error);
    }
})
}
}