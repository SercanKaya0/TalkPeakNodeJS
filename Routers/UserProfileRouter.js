const router = require('express').Router();
/// - Dosya yükleme Modülü
const PhotoUpload = require('../Functions/UploadFunctions/AvatarUploadFunctions/UploadFunctions')
const UserProfile_Controller = require('../Controllers/UserProfileControllers/UserProfileController')

router.post('/changeAvatar/',PhotoUpload.single('image'));
router.post('/rewardedAd/',UserProfile_Controller.rewarded_ad);
router.post('/changePassword/',UserProfile_Controller.change_password);
router.post('/resendToken/',UserProfile_Controller.send_email_token);
router.post('/changeEmail/',UserProfile_Controller.change_email);
router.post('/hiddenStatus/',UserProfile_Controller.hidden_status);
router.post('/hiddenDiscovery/',UserProfile_Controller.hidden_discovery);
router.post('/hiddenBirtdate/',UserProfile_Controller.hidden_birtdate)
router.post('/deleteAccount/',UserProfile_Controller.delete_account)
module.exports = router;