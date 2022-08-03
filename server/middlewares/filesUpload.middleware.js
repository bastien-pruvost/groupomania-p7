const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { multerValidator } = require('./validators.middleware');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req, file) => {
      if (file.fieldname === 'postPic') return 'groupomania/post';
      if (file.fieldname === 'profilePic') return 'groupomania/profile';
      if (file.fieldname === 'coverPic') return 'groupomania/cover';
      return null;
    },
    public_id: (req, file) => `${Date.now()}-${req.user.id}`
  }
});

exports.uploadImage = (req, res, next) => {
  const fieldsOptions = [
    { name: 'postPic', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 },
    { name: 'coverPic', maxCount: 1 }
  ];
  multer({ storage, fileFilter: multerValidator }).fields(fieldsOptions)(req, res, (err) => {
    if (err) console.log(err.message);
    return next();
  });
};

exports.deleteFile = (publicId) => {
  !!publicId &&
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (result) console.log('File delete : ', result);
      if (error) console.log('File delete : ', error);
    });
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
