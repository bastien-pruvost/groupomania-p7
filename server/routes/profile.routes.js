const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/auth.middleware');
const { uploadImage } = require('../middlewares/filesUpload.middleware');
const { getUserProfile, updateUserInfos } = require('../controllers/profile.controller');

router.get('/:userId', ensureAuthenticated, getUserProfile);
router.put('/:userId', ensureAuthenticated, ensureUserIsOwner, uploadImage, updateUserInfos);

module.exports = router;
