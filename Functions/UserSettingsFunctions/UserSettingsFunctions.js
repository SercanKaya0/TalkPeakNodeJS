/// - User Setting Schema Modülü
const Settings_Schema = require('../../Schemas/UserSettingSchema/UserSettingsSchema')



exports.user_settings = function user_from_settings(to,from){
    return new Promise((resolve,reject)=>{
        const SettingsSchema = new Settings_Schema({},{collection:'user_settings'})
        const Settings = SettingsSchema.model('user_settings',SettingsSchema)
        Settings.find()
        .and([{to:to},{from:from}])
        .select({__v:0,createdAt:0,updatedAt:0})
        .then(setting_result=>{
            resolve(setting_result)
        })
    })
}

exports.user_settings_socket = function user_settings_socket(to,from,socket){
    return new Promise((resolve,reject)=>{
        const SettingsSchema = new Settings_Schema({},{collection:'user_settings'})
        const Settings = SettingsSchema.model('user_settings',SettingsSchema)
        Settings.find()
        .and([{to:to},{from:from}])
        .select({__v:0,createdAt:0,updatedAt:0})
        .then(setting_result=>{
            resolve(socket.emit('Settings',setting_result))
        })
    })
}

exports.save_follows = function save_follows(to,from){
    return new Promise((resolve,reject)=>{
    const data = {to:to,from:from,is_follow:true,is_blocked:false}
    const save_data = new Settings_Schema(data)
    save_data.save()
        .then(setting_result=>{
            resolve(setting_result)
        })
    })
}
exports.update_follows = function update_follows(to,from){
    return new Promise((resolve,reject)=>{
    const SettingsSchema = new Settings_Schema({},{collection:'user_settings'})
    const Settings = SettingsSchema.model('user_settings',SettingsSchema)
    Settings.findOneAndUpdate({$and:[{to:to},{from:from}]},{is_follow:true},{new:true})
        .then(update_follows_result=>{
            resolve(update_follows_result)
        })
    })
}
exports.update_follows_false = function update_follows_false(to,from){
    return new Promise((resolve,reject)=>{
    const SettingsSchema = new Settings_Schema({},{collection:'user_settings'})
    const Settings = SettingsSchema.model('user_settings',SettingsSchema)
    Settings.findOneAndUpdate({$and:[{to:to},{from:from}]},{is_follow:false},{new:true})
        .then(update_follows_result=>{
            resolve(update_follows_result)
        })
    })
}

