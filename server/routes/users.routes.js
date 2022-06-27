const router = require('express').Router();
const { signupValidator } = require('../middlewares/validators.middleware');
const { signup, login } = require('../controllers/users.controller');

router.post('/signup', signupValidator, signup);

router.post('/login', login);

module.exports = router;
