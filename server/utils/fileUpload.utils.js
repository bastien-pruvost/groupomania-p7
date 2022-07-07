const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

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

const deleteFile = (publicId) => {
  cloudinary.uploader.destroy(publicId, (error, result) => {
    console.log(result, error);
  });
};

// Setup accepted filetypes and filesize
const acceptedMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
const limits = {
  fileSize: 2097152
};

const fileFilter = (req, file, cb) => {
  console.log(file);
  const fileSize = parseInt(req.headers['content-length'], 10);
  if (!acceptedMimetypes.includes(file.mimetype)) {
    req.multerTypeError = true;
    return cb(null, false);
  }
  if (fileSize > 1150000) {
    req.multerSizeError = true;
    return cb(null, false);
  }
  return cb(null, true);
};

exports.uploadImage = (storageString) => {
  let storage = null;
  if (storageString === 'post') storage = postPicStorage;
  if (storageString === 'profile') storage = profilePicStorage;
  if (storageString === 'cover') storage = coverPicStorage;
  return (req, res, next) => {
    multer({ storage, fileFilter }).single('image')(req, res, (err) => {
      console.log(err);
      next();
    });
  };
};

// exports.uploadImage = (req, res, next) => {
//   multer({ storage: postPicStorage, fileFilter }).single('image')(req, res, (err) => {
//     if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
//       return res.status(400).json({
//         message: `L'image doit être envoyée dans un champ de formulaire nommée 'image'`
//       });
//     }
//     if (err && err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         message: `L'image est trop lourde veuillez ne pas depasser 1Mo`
//       });
//     }
//     if (req.file && !acceptedMimetypes.includes(req.file.mimetype)) {
//       deleteFile(req.file.filename);
//       return res.status(400).json({
//         message: `L'image n'est pas au bon format. Formats accéptés : Png, Jpg, Jpeg`
//       });
//     }
//     if (err) return res.status(500).json({ message: err.message });
//     return next();
//   });
// };

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
