/// - MongoDB modülü
const mongo = require('mongoose')
/// - MongoDB modülü değişen verileri dinleme ayarı
const connect = mongo.connection
/// - Kullanıcıya ait mesajları getiren fonksiyon mbu modülün içerisindedir.
const get_messages = require('../../Functions/MessagesFunctions/MessagesFunctions')
/// - Kullanıcının gönderdiği mesajlarda bir değişişlik var mı dinleme fonksiyonu
/// - to : Kullanıcının id'si
exports.MessageChangeStream = function MessageChangeStream(to,socket){
return new Promise((resolve,reject)=>{
    const changeStream = connect.collection('messages')
    .watch([{$match:{$or:[{"fullDocument.to": to},{"fullDocument.from":to}]}},{"$project":{'fullDocument.__v':0,'fullDocument.createdAt':0,'fullDocument.updatedAt':0}}],{fullDocument : 'updateLookup'});
    changeStream.on('change',(change)=>{
        if (change){
       get_messages(to,socket)
        }
    })
})
}

exports.change_message_from_me = function change_message_from_me(to,from,socket){
    return new Promise((resolve,reject)=>{
    const changeStream = connect.collection('messages')
    .watch([{$match:{$or:[{$and:[{'fullDocument.to':to,"fullDocument.from":from}]},{$and:[{'fullDocument.to':from,"fullDocument.from":to}]}]}},{"$project":{'fullDocument.__v':0,'fullDocument.createdAt':0,'fullDocument.updatedAt':0}}],{fullDocument : 'updateLookup'});
    changeStream.on('change',(change)=>{
        if (change){
           get_messages.get_message_from_me(to,from,socket) 
        }
    })
})
} 
