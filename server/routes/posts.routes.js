const router = require('express').Router();
const { ensureAuthenticated } = require('../middlewares/auth.middleware');
const { uploadImage } = require('../utils/fileUpload.utils');
const { postValidator } = require('../middlewares/validators.middleware');
const { createPost, getAllPosts } = require('../controllers/posts.controller');

router.post('/', ensureAuthenticated, uploadImage('post'), postValidator, createPost);
router.get('/', ensureAuthenticated, getAllPosts);

module.exports = router;
