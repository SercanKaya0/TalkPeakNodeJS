 /// - Dosya Yükleme Modülü
const multer = require('multer')
/// - Klasör Yolu modülü
const path = require('path')
/// - Dosya sistemi modülü
const fs = require('fs');
/// - Mesaj gönderme fonksiyon modülü
const send_messages_functions = require('../../../Functions/MessagesFunctions/SendMessagesFunctions')

const diskStorage = multer.diskStorage({
    destination : (request,file,callBack) => {
    /// - Gelen verileri yakalama
    const {to,from} = request.body
    /// - Eğer dosya yok ise oluşturma
       fs.mkdir(path.join(__dirname, '../../../Uploads/Photos/Messages/' + to+ '/' + from),{recursive:true},(error)=>{
    /// - Dosyayı kayıt etme
        callBack(null, path.join(__dirname, "../../../Uploads/Photos/Messages/" + to + '/' + from))

       })
    },
    filename  : (req,file,callBack) => {
        callBack(null,file.originalname)
    }
});

const ResimfileFilter =  async (request,file,callBack) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){

        const {to,from,send_time,send_date}  = request.body
        const messagePath = "http://192.168.1.21:3000" + "/Uploads/Photos/Messages/" + to + '/' + from + file.originalname;
            await send_messages_functions.save_photo(to,from,messagePath,send_date,send_time);
            const messages_count = await send_messages_functions.update_message_count(to,from);           
        callBack(null,true)
    }else {
        callBack(null,false)

    }
}

const upload = multer({storage:diskStorage,fileFilter: ResimfileFilter})
module.exports = upload;