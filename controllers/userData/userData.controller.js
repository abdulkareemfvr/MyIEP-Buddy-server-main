const UserData = require("../../models/userData/UserData.model");

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const data = await UserData.where({ email });

    res.status(200).json({
      message: "User data get successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const createUserData = async (req, res) => {
  try {
    const { email } = req.params;
    const { name } = req.body;

    const userData = await UserData.create({
      email,
      name,
    });

    res.status(200).json({
      message: "UserData created successfully",
      userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const { email, id } = req.params;

    const data = await UserData.where({ email, _id: id });

    res.status(200).json({
      message: "User data get successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const deleteUserDataById = async (req, res) => {
  try {
    const { id, email } = req.params;

    const data = await UserData.deleteOne({ _id: id, email });

    res.status(200).json({
      message: "User data deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

module.exports = {
  getUserData,
  createUserData,
  getUserByEmail,
  deleteUserDataById,
};
