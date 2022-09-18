const router = require('express').Router();
const { ensureAuthenticated, ensureUserIsOwner } = require('../middlewares/auth.middleware');
const {
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments.controller');
const { commentValidator } = require('../middlewares/validators.middleware');

router.post('/', ensureAuthenticated, commentValidator, createComment);
router.put('/:commentId', ensureAuthenticated, ensureUserIsOwner, commentValidator, updateComment);
router.delete('/:commentId', ensureAuthenticated, ensureUserIsOwner, deleteComment);

module.exports = router;
