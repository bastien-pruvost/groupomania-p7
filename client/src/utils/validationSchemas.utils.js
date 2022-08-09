import validator from 'validator';

// Validation schema with error messages for authentication form
export const authValidator = (passwordRef) => {
  return {
    email: {
      isNotEmpty: (value) => !validator.isEmpty(value) || `Vous devez renseigner un email`,
      isEmail: (value) => validator.isEmail(value) || `L'email n'est pas au bon format`
    },
    password: {
      isNotEmpty: (value) => !validator.isEmpty(value) || `Vous devez renseigner un mot de passe`,
      isLength: (value) =>
        validator.isLength(value, { min: 8, max: 1024 }) ||
        `Le mot de passe doit contenir au minimum 8 caractères`,
      isStrong: (value) =>
        validator.isStrongPassword(value, {
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }) ||
        `Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial`
    },
    passwordConfirm: {
      isNotEmpty: (value) => !validator.isEmpty(value) || `Vous devez confirmer le mot de passe`,
      passwordMatch: (value) => value === passwordRef || `Les mots de passe ne correspondent pas`
    },
    lastname: {
      isNotEmpty: (value) => !validator.isEmpty(value) || `Vous devez renseigner un nom`,
      isLength: (value) =>
        validator.isLength(value, { min: 2, max: 100 }) ||
        `Le nom doit contenir entre 2 et 100 caractères`,
      isAlpha: (value) =>
        validator.matches(value, /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/) ||
        `Le nom ne doit pas contenir de caractères spéciaux ou de chiffres`
    },
    firstname: {
      isNotEmpty: (value) => !validator.isEmpty(value) || `Vous devez renseigner un prénom`,
      isLength: (value) =>
        validator.isLength(value, { min: 2, max: 100 }) ||
        `Le prénom doit contenir entre 2 et 100 caractères`,
      isAlpha: (value) =>
        validator.matches(value, /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/) ||
        `Le prénom ne doit pas contenir de caractères spéciaux ou de chiffres`
    }
  };
};

const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

// Validation schema with error messages for authentication form
export const postValidator = {
  content: {
    isLength: (value) =>
      validator.isLength(value, { max: 2000 }) ||
      `Le contenu du post ne doit pas depasser 2000 caractères`
  },
  image: {
    isImage: (value) => {
      if (value.length > 0) {
        return (
          acceptedImageTypes.includes(value[0].type) ||
          `L'image doit être au format JPEG, JPG, ou PNG`
        );
      }
    },
    isAcceptedSize: (value) => {
      if (value.length > 0) {
        return value[0].size < 1150000 || `L'image ne doit pas dépasser 1 Mo`;
      }
    }
  }
};

export const commentValidator = {
  content: {
    isLength: (value) =>
      validator.isLength(value, { min: 1, max: 1000 }) ||
      `Le commentaire doit contenir entre 1 et 1000 caractères`
  }
};

export const profileValidator = {
  lastname: {
    isNotEmpty: (value) => !validator.isEmpty(value) || `Vous devez renseigner un nom`,
    isLength: (value) =>
      validator.isLength(value, { min: 2, max: 100 }) ||
      `Le nom doit contenir entre 2 et 100 caractères`,
    isAlpha: (value) =>
      validator.matches(value, /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/) ||
      `Le nom ne doit pas contenir de caractères spéciaux ou de chiffres`
  },
  firstname: {
    isNotEmpty: (value) => !validator.isEmpty(value) || `Vous devez renseigner un prénom`,
    isLength: (value) =>
      validator.isLength(value, { min: 2, max: 100 }) ||
      `Le prénom doit contenir entre 2 et 100 caractères`,
    isAlpha: (value) =>
      validator.matches(value, /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/) ||
      `Le prénom ne doit pas contenir de caractères spéciaux ou de chiffres`
  },
  profession: {
    isLength: (value) =>
      validator.isLength(value, { max: 150 }) || `La profession ne doit pas dépasser 150 caractères`
  },
  birthDate: {
    isDate: (value) =>
      validator.isDate(value, { format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-'] }) ||
      `La date d'anniversaire n'est pas valide`
  },
  city: {
    isLength: (value) =>
      validator.isLength(value, { max: 150 }) || `La ville ne doit pas dépasser 150 caractères`
  },
  phoneNumber: {
    isMobilePhone: (value) =>
      validator.isMobilePhone(value, ['fr-FR']) || `Le numéro de téléphone n'est pas au bon format`
  },
  linkedinUrl: {
    isUrl: (value) => validator.isURL(value) || `L'url linkedin n'est pas une url valide`
  },
  bio: {
    isLength: (value) =>
      validator.isLength(value, { max: 2000 }) ||
      `La description ne doit pas dépasser 2000 caractères`
  },
  image: {
    isImage: (value) => {
      if (value.length > 0) {
        return (
          acceptedImageTypes.includes(value[0].type) ||
          `L'image doit être au format JPEG, JPG, ou PNG`
        );
      }
    },
    isAcceptedSize: (value) => {
      if (value.length > 0) {
        return value[0].size < 1100000 || `L'image ne doit pas dépasser 1 Mo`;
      }
    }
  }
};
