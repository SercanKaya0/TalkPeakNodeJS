/// - Kullanıcılar Şeması Modülü
const UsersSchemas = require('../../Schemas/UsersSchema/UsersSchemas');

/**
 * @function add_followers_me : Takip edilen kullanıcnın id sini user koleksiyonunda takip eden kullanıcının follows dizisine ekler
 * @param {*} to  : Takip eden kullanıcı idsi
 * @param {*} from  : Takip edilen kullanıcı idsi
 * @param {*} from_information  : Takip edilen kullanıcının bilgileri
 */
exports.add_follows_me = function add_follows_me(to,from){
    return new Promise((resolve,reject)=>{
        const ProfileSchema = new UsersSchemas({},{collection:'users'})
        const Profile = ProfileSchema.model('users',ProfileSchema)
        Profile.findByIdAndUpdate(to,{$addToSet:{follows:from}})
        .then(add_followers_me_result=>{resolve(add_followers_me_result)})
        .catch(add_followers_me_error=>{reject(add_followers_me_error)})

    })
}
/**
 * @function add_follows_from : Takip edilen kullanıcıyı takip edenler followers dizisine kaydeder
 * @param {*} from  : Takip edilen kullanici idsi
 * @param {*} follows : Takip edilen kullanıcıyı, takip edenler dizisi
 */
exports.add_followers_from = function add_followers_from(to,from) {
    return new Promise((resolve,reject)=>{
        const UsersSchemaFind = new UsersSchemas({},{collection:'users'});
        const Users = UsersSchemaFind.model('users',UsersSchemaFind)
        Users.findByIdAndUpdate(from,{$addToSet:{followers:to}},{new:true})
        .then(update_follows_array_result=>{resolve(update_follows_array_result)})
        .catch(update_follows_array_error=>{reject(update_follows_array_error)})
    })
}

/**
 * @function update_follows_count : Takip edilen kullanıcının takip edilme sayısını günceller
 * @param {*} from  : Takip edilen kullanıcı idsi
 */
exports.update_follows_count = function update_follows(from) {
    return new Promise((resolve,reject)=>{
    const UsersSchemaFind = new UsersSchemas({},{collection:'users'});
    const Users = UsersSchemaFind.model('users',UsersSchemaFind)
    Users.findByIdAndUpdate(from,{$inc:{followers_count:1}},{new:true})
    .then(update_follows_count_result=>{resolve(update_follows_count_result)})
    .catch(update_follows_count_error=>{reject(update_follows_count_error)})
    })
}

/**
 * @function update_followers_count : Takip eden kullanıcının takip etme sayısını günceller
 * @param {*} t0  : Takip eden kullanıcı idsi
 */
exports.update_followers_count = function update_followers(to) {
    return new Promise((resolve,reject)=>{
    const UsersSchemaFind = new UsersSchemas({},{collection:'users'});
    const Users = UsersSchemaFind.model('users',UsersSchemaFind)
    Users.findByIdAndUpdate(to,{$inc:{follows_count:1}},{new:true})
    .then(update_follows_count_result=>{resolve(update_follows_count_result)})
    .catch(update_follows_count_error=>{reject(update_follows_count_error)})
    })
}