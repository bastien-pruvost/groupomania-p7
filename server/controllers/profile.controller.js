const { deleteFile } = require('../middlewares/filesUpload.middleware');
const { findUserProfileById, updateUserInfosById } = require('../queries/users.queries');

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await findUserProfileById(userId);
    res.status(200).json({ userProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserInfos = async (req, res) => {
  try {
    const { userId } = req.params;
    const { body, user, files } = req;
    const profilePic = files.profilePic ? files.profilePic[0] : null;
    const coverPic = files.coverPic ? files.coverPic[0] : null;
    const updatedData = {
      lastname: body.lastname,
      firstname: body.firstname,
      profession: body.profession || null,
      birthDate: body.birthDate || null,
      phoneNumber: body.phoneNumber || null,
      linkedinUrl: body.linkedinUrl || null,
      city: body.city || null,
      bio: body.bio || null
    };

    if (profilePic) {
      deleteFile(user.profilePicPath);
      updatedData.profilePicPath = profilePic.filename;
    } else if (body.profilePicDeleted === 'true') {
      deleteFile(user.profilePicPath);
      updatedData.profilePicPath = null;
    } else {
      updatedData.profilePicPath = user.profilePicPath;
    }

    if (coverPic) {
      deleteFile(user.coverPicPath);
      updatedData.coverPicPath = coverPic.filename;
    } else if (body.coverPicDeleted === 'true') {
      deleteFile(user.coverPicPath);
      updatedData.coverPicPath = null;
    } else {
      updatedData.coverPicPath = user.coverPicPath;
    }

    await updateUserInfosById(userId, updatedData);
    const updatedProfile = await findUserProfileById(userId);
    res.status(200).json({ userProfile: updatedProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
