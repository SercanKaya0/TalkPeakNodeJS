const router = require('express').Router();
/// - Kullanıcı Takip Etme controller moodülü
const FollowsController = require('../Controllers/AddFollowsControllers/AddFollowsController')

router.post('/addFollow/',FollowsController.add_follows);
router.post('/unfollow/',FollowsController.unfollow);

module.exports = router;

