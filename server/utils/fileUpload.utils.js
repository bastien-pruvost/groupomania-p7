const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const profilePicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'groupomania/profile',
    public_id: (req, file) =>
      `${Date.now()}-${req.user.firstname}-${req.user.lastname}`
  }
});

const coverPicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'groupomania/cover',
    public_id: (req, file) =>
      `${Date.now()}-${req.user.firstname}-${req.user.lastname}`
  }
});

const postPicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'groupomania/post',
    public_id: (req, file) =>
      `${Date.now()}-${req.user.firstname}-${req.user.lastname}`
  }
});

exports.deleteFile = (publicId) => {
  cloudinary.uploader.destroy(publicId, (error, result) => {
    console.log(result, error);
  });
};

exports.uploadPostPic = multer({ storage: postPicStorage });

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
