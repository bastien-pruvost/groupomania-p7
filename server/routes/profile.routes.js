const router = require('express').Router();
const { ensureAuthenticated } = require('../middlewares/auth.middleware');
const { getUserProfile } = require('../controllers/profile.controller');

router.get('/:userId', ensureAuthenticated, getUserProfile);

module.exports = router;
