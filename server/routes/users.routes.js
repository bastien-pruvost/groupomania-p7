const router = require('express').Router();
const { registerValidator } = require('../middlewares/validators.middleware');
const { ensureAuthenticated } = require('../middlewares/auth.middleware');
const {
  register,
  login,
  logout,
  jwtid
} = require('../controllers/users.controller');

router.post('/register', registerValidator, register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/jwtid', ensureAuthenticated, jwtid);

module.exports = router;
