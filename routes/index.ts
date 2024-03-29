const ri_express = require('express');
const router = ri_express.Router();

router.use('/', require('./swagger'));
router.use('/songs', require('./songs'));
router.use('/artists', require('./artists'));
router.use('/albums', require('./albums'));
//router.use('/artistsongs', require('./artistsongs'));

module.exports = router;