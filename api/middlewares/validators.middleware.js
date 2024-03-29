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
  // if (req.files) Object.values(req.files).forEach((file) => deleteFile(file[0].filename));
  return res.status(400).json({ message });
};

// Check the format of inputs in the signup form
exports.signupValidator = [
  body('email').trim().isEmail().withMessage(`L'adresse email n'est pas au bon format`),
  body('lastname')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage(`Le nom doit contenir entre 2 et 100 caractères`)
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage(`Le nom ne doit pas contenir de caractères spéciaux ni de chiffres`),
  body('firstname')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage(`Le prénom doit contenir entre 2 et 100 caractères`)
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage(`Le prénom ne doit pas contenir de caractères spéciaux ni de chiffres`),
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
      `Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial`
    ),

  body('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage(`La confirmation du mot de passe ne correspond pas au mot de passe`),
  checkValidationErrors
];

exports.postValidator = [
  body('content')
    .trim()
    .isLength({ max: 2000 })
    .withMessage(`Le contenu du post ne doit pas dépasser 2000 caractères`),
  body()
    .custom((value, { req }) => !req.multerTypeError)
    .withMessage(`L'image doit être au format JPEG, JPG, ou PNG`)
    .custom((value, { req }) => !req.multerSizeError)
    .withMessage(`L'image ne doit pas dépasser 1 MB`),
  body()
    .custom((value, { req }) => req.body.content != null)
    .withMessage(`Le formulaire doit contenir un champ 'content' meme si il est vide`),
  body()
    .custom(
      (value, { req }) =>
        req.body.content ||
        req.files.postPic ||
        (req.post.imagePath && req.body.imageDeleted === 'false')
    )
    .withMessage(`Vous ne pouvez pas publier un post vide`),
  checkValidationErrors
];

exports.commentValidator = [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Le contenu du commentaire ne peut pas être vide`)
    .isLength({ max: 1000 })
    .withMessage(`Le contenu du commentaire ne doit pas dépasser 1000 caractères`),
  checkValidationErrors
];

exports.profileValidator = [
  body('lastname')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage(`Le nom doit contenir entre 2 et 100 caractères`)
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage(`Le nom ne doit pas contenir de caractères spéciaux ni de chiffres`),
  body('firstname')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage(`Le prénom doit contenir entre 2 et 100 caractères`)
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/)
    .withMessage(`Le prénom ne doit pas contenir de caractères spéciaux ni de chiffres`),
  body('profession')
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .isLength({ max: 75 })
    .withMessage(`La profession ne doit pas dépasser 75 caractères`),
  body('birthDate')
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .isDate({ format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-'] })
    .withMessage(`La date d'anniversaire n'est pas valide`),
  body('city')
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .isLength({ max: 75 })
    .withMessage(`La ville ne doit pas dépasser 75 caractères`),
  body('phoneNumber')
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .isMobilePhone(['fr-FR'])
    .withMessage(`Le numéro de téléphone n'est pas au bon format`),
  body('linkedinUrl')
    .optional({ checkFalsy: true, nullable: true })
    .trim()
    .isURL()
    .withMessage(`L'url linkedin n'est pas une url valide`),
  body('bio')
    .optional({ checkFalsy: true, nullable: true })
    .isLength({ max: 2000 })
    .withMessage(`La description ne doit pas dépasser 2000 caractères`),
  body()
    .custom((value, { req }) => !req.multerTypeError)
    .withMessage(`Les images doivent être au format JPEG, JPG, ou PNG`)
    .custom((value, { req }) => !req.multerSizeError)
    .withMessage(`Les images ne doivent pas dépasser 1 MB`),
  checkValidationErrors
];
