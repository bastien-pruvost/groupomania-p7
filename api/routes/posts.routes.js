const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/auth.middleware');
const { uploadImage } = require('../middlewares/filesUpload.middleware');
const { postValidator } = require('../middlewares/validators.middleware');
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getUserPosts
} = require('../controllers/posts.controller');

router.get('/', ensureAuthenticated, getAllPosts);
router.get('/user/:userId', ensureAuthenticated, getUserPosts);
router.post('/', ensureAuthenticated, uploadImage, postValidator, createPost);
router.put(
  '/:postId',
  ensureAuthenticated,
  ensureUserIsOwner,
  uploadImage,
  postValidator,
  updatePost
);
router.delete('/:postId', ensureAuthenticated, ensureUserIsOwner, deletePost);
router.post('/like/:postId', ensureAuthenticated, likePost);
router.post('/dislike/:postId', ensureAuthenticated, dislikePost);

module.exports = router;
