/// - Mesajlar şeması
const MessagesSchemas = require('../../Schemas/MessagesSchema/MessagesSchema');
/// - Kullanıcılar şeması 
const UsersSchema = require('../../Schemas/UsersSchema/UsersSchemas')



exports.save_messages = function save_message(to,from,message,send_date,send_time){
    return new Promise((resolve,reject)=>{
    const saveData = {to:to,from:from,message:message,send_date:send_date,send_time:send_time,message_type:"text",from_information : from}
    const saveMongoDB = new MessagesSchemas(saveData)
    saveMongoDB.save()
    .then(save_message_result=>{resolve(save_message_result)})
    .catch(save_message_error=>{reject(save_message_error)})

    })
}


exports.update_message_count = function update_message_count(to,from){
    return new Promise((resolve,reject)=>{
    const Users_Schema  = new UsersSchema({},{collection:'users'})
         const Users = Users_Schema.model('users',Users_Schema) 
         Users.updateMany({$or:[{_id:to},{_id:from}]},{$inc :{messages_count:1} },{new:true})
         .then(messages_count_result=>{resolve(messages_count_result)})
         .catch(messages_count_error=>{reject(messages_count_error)})
    })
}

exports.save_giphy = function save_giphy(to,from,photo,send_date,send_time){
    const saveData = {to:to,from:from,photo:photo,send_date:send_date,send_time:send_time,from_information:from,message_type:"gif"}
    const saveMongoDB = new MessagesSchemas(saveData)
    saveMongoDB.save();
}

exports.save_gift = function save_gift(to,from,gift,send_time,name,price,send_date){
    const saveData = {to:to,from:from,gift:gift,send_date:send_date,send_time:send_time,name:name,price:price,from_information:from,message_type:"gift"}
    const saveMongoDB = new MessagesSchemas(saveData)
    saveMongoDB.save();
}



exports.save_photo = function save_photo(to,from,path,send_date,send_time){
    const saveData = {to:to,from:from,photo:path,send_date:send_date,send_time:send_time,from_information:from,message_type:"image"}
    const saveMongoDB = new MessagesSchemas(saveData)
    saveMongoDB.save();
}
