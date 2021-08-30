const router = require('express').Router();
/// - Kullanıcı kayıt controller moodülü
const AuthenticationController = require('../Controllers/AuthenticationControllers/AuthenticationController')

/**
 * @param {*} register : Kullanıcı kayıt işlerini yapar
 * @param {*} login : Kullanıcı giriş işlemlerini yapan
 * @param {*} register_complete : Kullanıcı kayıt tamamlama işlemlerini yapar
 */
// router.post('/register/',AuthenticationController.register);
// router.post('/login/',AuthenticationController.login);
// router.post('/registerComplete/',AuthenticationController.register_complete);
router.get('/verify/email/',AuthenticationController.email_confirmed)


module.exports = router;

