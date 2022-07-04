const router = require('express').Router();
const { ensureAuthenticated } = require('../middlewares/auth.middleware');
const { uploadPostPic } = require('../utils/fileUpload.utils');
const { newPostValidator } = require('../middlewares/validators.middleware');
const { createPost } = require('../controllers/posts.controller');

router.post('/', ensureAuthenticated, createPost);

module.exports = router;
