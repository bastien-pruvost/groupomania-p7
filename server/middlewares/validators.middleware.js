const { body, validationResult } = require('express-validator');

// Manages errors from different express-validators to return them to the user
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorMsg = '';
    errors.errors.forEach((error) => {
      errorMsg += `${error.msg}. `;
    });
    return res.status(400).json({ message: errorMsg });
  }
  return next();
};

// Check the format of inputs in the register form
exports.registerValidator = [
  body('email')
    .trim()
    .isEmail()
    .withMessage(`L'adresse email n'est pas au bon format`),
  body('lastname')
    .trim()
    .isLength({ min: 2, max: 100 })
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage(
      'Le nom ne doit pas contenir de caractères spéciaux ni de chiffres'
    ),
  body('firstname')
    .trim()
    .isLength({ min: 2, max: 100 })
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage(
      'Le prénom ne doit pas contenir de caractères spéciaux ni de chiffres'
    ),
  body('password')
    .isLength({ min: 8, max: 1024 })
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(
      'Le mot de passe doit contenir au minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
    ),

  body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(
        'La confirmation du mot de passe ne correspond pas au mot de passe'
      );
    }
    return true;
  }),
  (req, res, next) => {
    checkValidationErrors(req, res, next);
  }
];
