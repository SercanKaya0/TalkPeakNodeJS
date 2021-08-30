/// - Kullanıcı takğip etme fonksyion modülü
const add_follow_functions = require('../../Functions/FollowsFunctions/AddFollowsFunctions')
/// - Kullanıcı takipten çıkma fonksiyon modülü
const unfollow_functions = require('../../Functions/FollowsFunctions/UnfollowFunctions')
/// - Kullanıcılar arası ayarlar modülü
const user_from_setting_functions = require('../../Functions/UserSettingsFunctions/UserSettingsFunctions')
module.exports = {
    add_follows : async (request,response) => {
      try{
        const {to,from} = request.body
        const find_from_user = await  add_follow_functions.add_follows_me(to,from)
        const add_follows_from = await  add_follow_functions.add_followers_from(to,from)
        const update_follows_count = await add_follow_functions.update_follows_count(from);
        const update_followers_count = await add_follow_functions.update_followers_count(to);
        await response.send({status:200,messages:"Sucess"})
        const user_from_settings = await user_from_setting_functions.user_settings(to,from);
        if (user_from_settings.length == 0) {
        const save_settings = await user_from_setting_functions.save_follows(to,from);
        }else {
        const update_follows_result = await user_from_setting_functions.update_follows(to,from)
        }
        
      }catch(error){
        console.log(error);
      }

},
unfollow :  async (request,response) => {
  try{
    const {to,from} = request.body

    const unfollow = await unfollow_functions.unfollow_follows_me(to,from)
    const unfollow_from = await unfollow_functions.unfollow_followers_from(to,from);
    const unfollow_follows_count_to = await unfollow_functions.unfollow_follows_count_me(to)
    const unfollow_followers_count_from = await unfollow_functions.unfollow_followers_count_from(from)
   const update_follows_false = await user_from_setting_functions.update_follows_false(to,from)
   await response.send({status:200,messages:"Sucess"})

  }catch(error){
    console.log(error);
  }

}
}


