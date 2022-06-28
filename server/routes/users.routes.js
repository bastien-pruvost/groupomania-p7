const router = require('express').Router();
const { registerValidator } = require('../middlewares/validators.middleware');
const { register, login, logout } = require('../controllers/users.controller');

router.post('/register', registerValidator, register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
