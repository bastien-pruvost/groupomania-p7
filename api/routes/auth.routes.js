const router = require('express').Router();
const { signupValidator } = require('../middlewares/validators.middleware');
const { signup, signin, signout, getCurrentUser } = require('../controllers/auth.controller');

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/getcurrentuser', getCurrentUser);

module.exports = router;
