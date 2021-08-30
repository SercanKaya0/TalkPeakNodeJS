const router = require('express').Router();
/// - Kullanıcı Takip Etme controller moodülü
const SendMessageController = require('../Controllers/SendMessageController/SendMessageController')
/// - Dosya yükleme Modülü
const PhotoUpload = require('../Functions/UploadFunctions/SendMessagesUploadPhotoFunctions/SendMessagesUploadPhotoFunctions')
router.post('/sendMessage/',SendMessageController.send_message);
router.post('/sendGiphy/',SendMessageController.send_giphy);
router.post('/sendPhotos/',PhotoUpload.single('image'));
router.post('/sendGift/',SendMessageController.send_gift);

module.exports = router;
