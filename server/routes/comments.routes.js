const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/auth.middleware');
const { createComment } = require('../controllers/comments.controller');

router.post('/', ensureAuthenticated, createComment);
// router.get('/', ensureAuthenticated, getAllPosts);
// router.put(
//   '/:commentId',
//   ensureAuthenticated,
//   ensureUserIsOwner,
//   uploadImage('post'),
//   postValidator,
//   updatePost
// );
// router.delete('/:commentId', ensureAuthenticated, ensureUserIsOwner, deletePost);

module.exports = router;
