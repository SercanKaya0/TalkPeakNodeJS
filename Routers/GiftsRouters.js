/// - Tüm hediyeler yönlendirme modülü
const GiftsContoller = require('../Controllers/GiftsControllers/GiftsControllers')
const router = require('express').Router();
router.get('/getgifts/',GiftsContoller.all_gifts)

module.exports = router;