const router = require('express').Router();
/// - Kullanıcılar keşfet modülü
const Discovery = require('../Controllers/DiscoveryControllers/DiscoveryControllers')
router.get('/discovery/',Discovery.discovery)
module.exports = router