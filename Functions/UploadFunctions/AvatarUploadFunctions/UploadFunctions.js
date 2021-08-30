 /// - Dosya Yükleme Modülü
 const multer = require('multer')
 /// - Klasör Yolu modülü
 const path = require('path')
 /// - Dosya sistemi modülü
 const fs = require('fs');
/// - Kullanıcı profilini güncelleme modülü
const User_profile_change = require('../../../Functions/UserProfileFunctions/UserProfileFunctions')


 const diskStorage = multer.diskStorage({
    destination : (request,file,callBack) => {
    /// - Gelen verileri yakalama
    const {to} = request.body
    /// - Eğer dosya yok ise oluşturma
       fs.mkdir(path.join(__dirname, '../../../Uploads/Photos/Users/Avatar/' + to + '/'),{recursive:true},(error)=>{
    /// - Dosyayı kayıt etme
        callBack(null, path.join(__dirname, "../../../Uploads/Photos//Users/Avatar/" + to + '/'))
       })
    },
    filename  : (req,file,callBack) => {
        callBack(null,file.originalname)
    }
});

const ResimfileFilter =  (request,file,callBack) => {
    const {to} = request.body
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        const messagePath = "http://192.168.1.21:3000" + "/Uploads/Photos//Users/Avatar/" + to + '/' + file.originalname;
        User_profile_change.upload_avatar(to,messagePath)
        callBack(null,true)
    }else{
        callBack(null,false)
    }
}

const upload = multer({storage:diskStorage,fileFilter: ResimfileFilter})
module.exports = upload;