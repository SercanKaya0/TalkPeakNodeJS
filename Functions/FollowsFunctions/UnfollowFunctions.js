/// - Kullanıcılar Şeması Modülü
const UsersSchemas = require('../../Schemas/UsersSchema/UsersSchemas');

/**
 * @function unfollow_follows_me : Takip eden kullanıcının follows dizisinde siler
 * @param {*} to  : Takip eden kullanıcı idsi
 * @param {*} from  : Takip edilen kullanıcı idsi
 */
exports.unfollow_follows_me = function unfollow_follows_me(to,from){
    return new Promise((resolve,reject)=>{
        const ProfileSchema = new UsersSchemas({},{collection:'users'})
        const Profile = ProfileSchema.model('users',ProfileSchema)
        Profile.findByIdAndUpdate(to,{$pull:{'follows':from}})
        .then(add_followers_me_result=>{resolve(add_followers_me_result)})
        .catch(add_followers_me_error=>{reject(add_followers_me_error)})

    })
}
/**
 * @function unfollow_followers_from : Takip edilen kullanıcının followers dizisinden siler
 * @param {*} to  : Takip edilen kullanici idsi
 * @param {*} from : Takip edilen kullanıcı idsi
 */
exports.unfollow_followers_from = function unfollow_followers_from(to,from) {
    return new Promise((resolve,reject)=>{
        const UsersSchemaFind = new UsersSchemas({},{collection:'users'});
        const Users = UsersSchemaFind.model('users',UsersSchemaFind)
        Users.findByIdAndUpdate(from,{$pull:{'followers':to}},{new:true})
        .then(update_follows_array_result=>{resolve(update_follows_array_result)})
        .catch(update_follows_array_error=>{reject(update_follows_array_error)})
    })
}

/**
 * @function update_follows_count : Takip edilen kullanıcının takip edilme sayısını günceller
 * @param {*} to  : Takip eden kullanıcı idsi
 */
exports.unfollow_follows_count_me = function unfollow_follows_count_me(to){
    return new Promise((resolve,reject)=>{
    const UsersSchemaFind = new UsersSchemas({},{collection:'users'});
    const Users = UsersSchemaFind.model('users',UsersSchemaFind)
    Users.findByIdAndUpdate(to,{$inc:{follows_count:-1}},{new:true})
    .then(update_follows_count_result=>{resolve(update_follows_count_result)})
    .catch(update_follows_count_error=>{reject(update_follows_count_error)})
    })
}

/**
 * @function update_follows_count : Takip edilen kullanıcının takip edilme sayısını günceller
 * @param {*} from  : Takip edilen kullanıcı idsi
 */
exports.unfollow_followers_count_from = function unfollow_followers_count_from(from){
    return new Promise((resolve,reject)=>{
    const UsersSchemaFind = new UsersSchemas({},{collection:'users'});
    const Users = UsersSchemaFind.model('users',UsersSchemaFind)
    Users.findByIdAndUpdate(from,{$inc:{followers_count:-1}},{new:true})
    .then(update_follows_count_result=>{resolve(update_follows_count_result)})
    .catch(update_follows_count_error=>{reject(update_follows_count_error)})
    })
}