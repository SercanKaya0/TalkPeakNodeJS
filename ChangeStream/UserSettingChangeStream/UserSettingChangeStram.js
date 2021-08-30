/// - User Setting Schema Modülü
const Setting_func = require('../../Functions/UserSettingsFunctions/UserSettingsFunctions')
/// - MongoDB modülü
const mongo = require('mongoose')
/// - MongoDB modülü değişen verileri dinleme ayarı
const connect = mongo.connection


const change_settings = function change_settings(to,from,socket){
    return new Promise((resolve,reject)=>{
        const changeStream = connect.collection('user_settings')
        .watch([{$match:{$and:[{"fullDocument.to": to},{"fullDocument.from":from}]}},{"$project":{'fullDocument.__v':0,'fullDocument.createdAt':0,'fullDocument.updatedAt':0}}],{fullDocument : 'updateLookup'});
        changeStream.on('change',(change)=>{
           Setting_func.user_settings_socket(to,from,socket)
        })
    })
}

module.exports = change_settings;