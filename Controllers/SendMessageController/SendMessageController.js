/// - Mesaj gönderme fonksiyon modülü
const send_messages_functions = require('../../Functions/MessagesFunctions/SendMessagesFunctions')
module.exports = {
    send_message : async (request,response) => {
        /// - Gelen verileri yakalama
        try{
        const {to,from,message,send_date,send_time} = request.body
            const send_message = await send_messages_functions.save_messages(to,from,message,send_date,send_time)
            const messages_count = await send_messages_functions.update_message_count(to,from);
        }catch (error){
            console.log(error);
        }
    },
    send_giphy : async (request,response) => {
        try{
        const {to,from,photo,send_time,send_date}  = request.body
            await send_messages_functions.save_giphy(to,from,photo,send_date,send_time);
            const messages_count = await send_messages_functions.update_message_count(to,from); 
        }catch (error){
            console.log(error);
        }
    },

    send_gift : async (request,response) => {
        try{
        const {to,from,gift,send_time,name,price,send_date}  = request.body
            await send_messages_functions.save_gift(to,from,gift,send_time,name,price,send_date);
            const messages_count = await send_messages_functions.update_message_count(to,from);
        }catch (error){
            console.log(error);
        }
    }
    
}