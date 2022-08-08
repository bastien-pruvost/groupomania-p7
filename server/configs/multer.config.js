exports.multerConfig = {
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  storageParams: {
    folder: (req, file) => {
      if (file.fieldname === 'postPic') return 'groupomania/post';
      if (file.fieldname === 'profilePic') return 'groupomania/profile';
      if (file.fieldname === 'coverPic') return 'groupomania/cover';
      return null;
    },
    public_id: (req, file) => `${Date.now()}-${req.user.id}`
  },
  fieldsOptions: [
    { name: 'postPic', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 },
    { name: 'coverPic', maxCount: 1 }
  ],
  limits: {
    fileSize: 1100000 // 1,1 Mo
  },
  acceptedMimetypes: ['image/png', 'image/jpg', 'image/jpeg']
};
