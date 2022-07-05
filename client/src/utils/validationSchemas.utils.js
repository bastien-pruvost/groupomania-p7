import validator from 'validator';

// Validation schema with error messages for authentication form
export const authValidation = (passwordRef) => {
  return {
    email: {
      isNotEmpty: (value) =>
        !validator.isEmpty(value) || 'Vous devez renseigner un email',
      isEmail: (value) =>
        validator.isEmail(value) || `L'email n'est pas au bon format`
    },
    password: {
      isNotEmpty: (value) =>
        !validator.isEmpty(value) || 'Vous devez renseigner un mot de passe',
      isLength: (value) =>
        validator.isLength(value, { min: 8, max: 1024 }) ||
        'Le mot de passe doit contenir au minimum 8 caractères',
      isStrong: (value) =>
        validator.isStrongPassword(value, {
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }) ||
        'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial'
    },
    passwordConfirm: {
      isNotEmpty: (value) =>
        !validator.isEmpty(value) || 'Vous devez confirmer le mot de passe',
      passwordMatch: (value) =>
        value === passwordRef || 'Les mots de passe ne correspondent pas'
    },
    lastname: {
      isNotEmpty: (value) =>
        !validator.isEmpty(value) || 'Vous devez renseigner un nom',
      isLength: (value) =>
        validator.isLength(value, { min: 2, max: 100 }) ||
        'Le nom doit contenir entre 2 et 100 caractères',
      isAlpha: (value) =>
        validator.matches(value, /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/) ||
        'Le nom ne doit pas contenir de caractères spéciaux ou de chiffres'
    },
    firstname: {
      isNotEmpty: (value) =>
        !validator.isEmpty(value) || 'Vous devez renseigner un prénom',
      isLength: (value) =>
        validator.isLength(value, { min: 2, max: 100 }) ||
        'Le prénom doit contenir entre 2 et 100 caractères',
      isAlpha: (value) =>
        validator.matches(value, /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/) ||
        'Le prénom ne doit pas contenir de caractères spéciaux ou de chiffres'
    }
  };
};

// Validation schema with error messages for authentication form
export const postValidation = () => {
  return {
    content: {
      isNotEmpty: (value) =>
        !validator.isEmpty(value) || 'Vous devez renseigner un email',
      isEmail: (value) =>
        validator.isEmail(value) || `L'email n'est pas au bon format`
    },
    image: {
      isNotEmpty: (value) =>
        !validator.isEmpty(value) || 'Vous devez renseigner un mot de passe',
      isLength: (value) =>
        validator.isLength(value, { min: 8, max: 1024 }) ||
        'Le mot de passe doit contenir au minimum 8 caractères',
      isStrong: (value) =>
        validator.isStrongPassword(value, {
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }) ||
        'Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial'
    }
  };
};
