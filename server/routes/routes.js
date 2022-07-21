const router = require('express').Router();
const authRouter = require('./auth.routes');
const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');
const profileRouter = require('./profile.routes');

router.use('/api/auth', authRouter);
router.use('/api/posts', postsRouter);
router.use('/api/comments', commentsRouter);
router.use('/api/profile', profileRouter);

module.exports = router;
