/// - Kullanıcılar şema modülü 
const UserSchemas = require('../../Schemas/UsersSchema/UsersSchemas');


exports.discovery = function discovery_users(){
  return new Promise((resolve,reject)=>{
    const DiscoverySchemas = new UserSchemas({},{collection:'users'})
    const Discovery = DiscoverySchemas.model('users',DiscoverySchemas);
    Discovery.aggregate()
    .match({$and:[{register_status:1},{account_status:0},{hidden_discovery:false}]})
    .sample(15)
    .then(random_discovery=>{
        resolve(random_discovery)
    })
   
  })
}


