const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/auth.middleware');
const { uploadImage } = require('../middlewares/filesUpload.middleware');
const { getUserProfile, updateUserInfos } = require('../controllers/profile.controller');
const { profileValidator } = require('../middlewares/validators.middleware');

router.get('/:userId', ensureAuthenticated, getUserProfile);
router.put(
  '/:userId',
  ensureAuthenticated,
  ensureUserIsOwner,
  uploadImage,
  profileValidator,
  updateUserInfos
);

module.exports = router;
