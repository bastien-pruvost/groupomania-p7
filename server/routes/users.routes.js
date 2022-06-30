const router = require('express').Router();
const { signupValidator } = require('../middlewares/validators.middleware');
const { ensureAuthenticated } = require('../middlewares/auth.middleware');
const {
  signup,
  signin,
  signout,
  verifyAuth
} = require('../controllers/users.controller');

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/verifyauth', verifyAuth);

module.exports = router;
