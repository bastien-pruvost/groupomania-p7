const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/auth.middleware');
const {
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments.controller');

router.post('/', ensureAuthenticated, createComment);
// router.get('/', ensureAuthenticated, getAllPosts);
router.put(
  '/:commentId',
  ensureAuthenticated,
  ensureUserIsOwner,
  // commentValidator,
  updateComment
);
router.delete('/:commentId', ensureAuthenticated, ensureUserIsOwner, deleteComment);

module.exports = router;
