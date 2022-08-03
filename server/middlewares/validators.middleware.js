const { validationResult, body } = require('express-validator');
const { deleteFile } = require('./filesUpload.middleware');

// Manages errors from different express-validators to return them to the user
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const message = [];
  errors.errors.forEach((error) => {
    message.push(error.msg);
  });
  if (req.files) Object.values(req.files).forEach((file) => deleteFile(file[0].filename));
  return res.status(400).json({ message });
};

exports.multerValidator = (req, file, cb) => {
  const fileSize = parseInt(req.headers['content-length'], 10);
  const acceptedMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (fileSize > 1150000) {
    req.multerSizeError = true;
    return cb(null, false);
  }
  if (!acceptedMimetypes.includes(file.mimetype)) {
    req.multerTypeError = true;
    return cb(null, false);
  }
  return cb(null, true);
};

// Check the format of inputs in the signup form
exports.signupValidator = [
  body('email').isEmail().withMessage(`L'adresse email n'est pas au bon format`),
  body('lastname')
    .isLength({ min: 2, max: 100 })
    .withMessage(`Le nom doit contenir entre 2 et 100 caractères`)
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage('Le nom ne doit pas contenir de caractères spéciaux ni de chiffres'),
  body('firstname')
    .isLength({ min: 2, max: 100 })
    .withMessage(`Le prénom doit contenir entre 2 et 100 caractères`)
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage('Le prénom ne doit pas contenir de caractères spéciaux ni de chiffres'),
  body('password')
    .isLength({ min: 8, max: 1024 })
    .withMessage(`Le mot de passe doit contenir minimum 8 caractères`)
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial'
    ),

  body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('La confirmation du mot de passe ne correspond pas au mot de passe');
    }
    return true;
  }),
  checkValidationErrors
];

exports.postValidator = [
  body('content')
    .isLength({ max: 2000 })
    .withMessage(`Le contenu du post ne doit pas depasser 2000 caractères`),
  body()
    .custom((value, { req }) => !req.multerTypeError)
    .withMessage(`L'image doit être au format JPEG, JPG, ou PNG`)
    .custom((value, { req }) => !req.multerSizeError)
    .withMessage(`L'image ne doit pas dépasser 1 Mo`),
  body()
    .custom((value, { req }) => req.body.content != null && req.files.postPic)
    .withMessage(`Vous ne pouvez pas publier un post vide`),
  checkValidationErrors
];
