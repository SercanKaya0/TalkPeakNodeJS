/// - Mesajlar şeması
const MessagesSchemas = require('../../Schemas/MessagesSchema/MessagesSchema');

exports.get_messages_me =  function getMessagesMe(to,socket){
return new Promise((resolve,reject)=>{
/// - Messages Database veri çekme hazırlık.
const MessagesSchema = new MessagesSchemas({},{collection:'messages'})
const Messages = MessagesSchema.model('messages',MessagesSchema);
/// - Messages.find() : Mesajlar koleksiyonunda arama yapar 
/// - and([{to: to}]) : Kullanıcının gönderdiği mesajları bulur.
/// - .select({__v : 0,createdAt:0,updatedAt:0}) : Gelen Sonuçlardan istemeyen değerleri filtreler
/// - socket.emit('Messages_Me',MessagesResult) : Bulunan değeri Cliente gönderir.
 Messages.find().or([{to: to},{from:to}]).select({__v : 0,createdAt:0,updatedAt:0})
 .then(MessagesResult=>{resolve(socket.emit('Messages',MessagesResult))})
 .catch(MessagesError=>{reject(MessagesError)})})
}

/**
 * @function get_message_from_me : Kullanıcılar arası mesajlaşması bulan fonksyon
 * @param {*} to : Mesaj gönderen kullanıcı idsi
 * @param {*} from : mesaj alan kullanıcı idsi
 */
exports.get_message_from_me = function get_message_from_me(to,from,socket){
    return new Promise((resolve,reject)=>{
const Messages_Schema = new MessagesSchemas({},{collection:'messages'})
const Messages = Messages_Schema.model('messages',Messages_Schema);
Messages.find({$or:[{$and:[{to:to,from:from}]},{$and:[{to:from,from:to}]}]})
.sort({send_date: 1,send_time: 1})
.select({__v:0,createdAt:0,updatedAt:0})
.then(messages_from_me_result=>{resolve(socket.emit('MessagesFromMe',messages_from_me_result))})
.catch(messages_from_me_error=>{reject(messages_from_me_error)})
})
}
