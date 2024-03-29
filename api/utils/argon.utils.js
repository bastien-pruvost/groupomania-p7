const argon2 = require('argon2');

// Function to hash a password
exports.hash = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 17408,
      timeCost: 3
    });
  } catch (err) {
    throw new Error(`Erreur lors de l'encryptage' : ${err}`);
  }
};

// Function to compare a hashed password with a plaintext password
exports.verify = async (password, encryptedPassword) => {
  try {
    return await argon2.verify(encryptedPassword, password);
  } catch (err) {
    throw new Error(`Erreur lors du décryptage : ${err}`);
  }
};
