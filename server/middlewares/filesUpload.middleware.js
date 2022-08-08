const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { multerConfig } = require('../configs/multer.config');

cloudinary.config(multerConfig.cloudinary);

const storage = new CloudinaryStorage({ cloudinary, params: multerConfig.storageParams });

const fileFilter = (req, file, cb) => {
  if (!multerConfig.acceptedMimetypes.includes(file.mimetype)) {
    req.multerTypeError = true;
    return cb(null, false);
  }
  return cb(null, true);
};

exports.uploadImage = (req, res, next) => {
  const multerParams = { storage, limits: multerConfig.limits, fileFilter };

  multer(multerParams).fields(multerConfig.fieldsOptions)(req, res, (err) => {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ message: err });
    if (err && err.code === 'LIMIT_FILE_SIZE') {
      req.multerSizeError = true;
      return next();
    }
    if (err) return res.status(500).json({ message: err.message });
    return next();
  });
};

exports.deleteFile = (publicId) => {
  !!publicId &&
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (result) console.log('File delete result : ', result);
      if (error) console.log('File delete error : ', error);
    });
};

// Local disk storage :
//
// exports.upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../public/images'));
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()} - ${file.originalname}`);
//     }
//   })
// });
