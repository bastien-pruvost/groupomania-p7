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
    const { body } = req;
    const updatedData = {};
    if (body.lastname) updatedData.lastname = body.lastname;
    if (body.firstname) updatedData.firstname = body.firstname;
    if (body.profession) updatedData.profession = body.profession;
    if (body.birthDate) updatedData.birthDate = body.birthDate;
    if (body.phoneNumber) updatedData.phoneNumber = body.phoneNumber;
    if (body.linkedinUrl) updatedData.linkedinUrl = body.linkedinUrl;
    if (body.city) updatedData.city = body.city;
    if (body.bio) updatedData.bio = body.bio;
    await updateUserInfosById(userId, updatedData);
    const updatedProfile = await findUserProfileById(userId);
    res.status(200).json({ profile: updatedProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
