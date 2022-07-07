const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { multerValidator } = require('./validators.middleware');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const postPicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'groupomania/post',
    public_id: (req, file) => `${Date.now()}-${req.user.firstname}-${req.user.lastname}`
  }
});

const profilePicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'groupomania/profile',
    public_id: (req, file) => `${Date.now()}-${req.user.firstname}-${req.user.lastname}`
  }
});

const coverPicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'groupomania/cover',
    public_id: (req, file) => `${Date.now()}-${req.user.firstname}-${req.user.lastname}`
  }
});

exports.deleteFile = (publicId) => {
  cloudinary.uploader.destroy(publicId, (error, result) => {
    console.log(result, error);
  });
};

exports.uploadImage = (storageString) => {
  let storage = null;
  if (storageString === 'post') storage = postPicStorage;
  if (storageString === 'profile') storage = profilePicStorage;
  if (storageString === 'cover') storage = coverPicStorage;
  return (req, res, next) => {
    multer({ storage, fileFilter: multerValidator }).single('image')(req, res, (err) => {
      if (err && err.code === 'LIMIT_UNEXPECTED_FILE')
        return res.status(400).json({
          message: `L'image doit être envoyée dans un champ de formulaire nommé "image"`
        });
      if (err) return res.status(500).json({ message: err.message });
      return next();
    });
  };
};

// Local multer save :
// exports.upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../public/images/avatars'));
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()} - ${file.originalname}`);
//     }
//   })
// });
