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
      profession: body.profession,
      birthDate: body.birthDate,
      phoneNumber: body.phoneNumber,
      linkedinUrl: body.linkedinUrl,
      city: body.city,
      bio: body.bio
    };

    if (profilePic) {
      !!user.profilePicPath && deleteFile(user.profilePicPath);
      updatedData.profilePicPath = profilePic.filename;
    } else if (body.profilePicDeleted === 'true') {
      !!user.profilePicPath && deleteFile(user.profilePicPath);
      updatedData.profilePicPath = null;
    } else {
      updatedData.profilePicPath = user.profilePicPath;
    }

    if (coverPic) {
      !!user.coverPicPath && deleteFile(user.coverPicPath);
      updatedData.coverPicPath = coverPic.filename;
    } else if (body.coverPicDeleted === 'true') {
      !!user.coverPicPath && deleteFile(user.coverPicPath);
      updatedData.coverPicPath = null;
    } else {
      updatedData.coverPicPath = user.coverPicPath;
    }

    console.log(updatedData);

    await updateUserInfosById(userId, updatedData);
    const updatedProfile = await findUserProfileById(userId);
    res.status(200).json({ profile: updatedProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
