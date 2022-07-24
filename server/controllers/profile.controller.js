const { findUserProfileById } = require('../queries/users.queries');

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await findUserProfileById(userId);
    res.status(200).json({ userProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
