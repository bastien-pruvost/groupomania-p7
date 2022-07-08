const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsPostOwner } = require('../middlewares/auth.middleware');
const { uploadImage } = require('../middlewares/filesUpload.middleware');
const { postValidator } = require('../middlewares/validators.middleware');
const { getAllPosts, createPost, updatePost } = require('../controllers/posts.controller');

router.get('/', ensureAuthenticated, getAllPosts);
router.post('/', ensureAuthenticated, uploadImage('post'), postValidator, createPost);
router.put(
  '/:id',
  ensureAuthenticated,
  ensureUserIsPostOwner,
  uploadImage('post'),
  postValidator,
  updatePost
);

module.exports = router;
