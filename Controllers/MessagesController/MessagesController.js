/// - Kullanıcıya ait mesajları getiren fonksiyon mbu modülün içerisindedir.
const get_messages_me = require('../../Functions/MessagesFunctions/MessagesFunctions')
/// - Kullanıcının Mesajlarındaki değişiklikleri dinleme
const change_stream_messages = require('../../ChangeStream/MessagesChangeStram/MessagesChangeStream')
module.exports = {
messages : async function(socket){
socket.on('Messages',async (to)=>{
    try{
   //  await get_messages_me.get_messages_me(to["to"],socket)
     // await change_stream_messages(to["to"],socket)
    }catch (error){
        console.log(error);
    }
})
}
}