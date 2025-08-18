const bcrypt = require("bcryptjs");
const User = require("../../model/users/usersModel");
const jwt = require("jsonwebtoken");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServerHelper = new APIServerHelper(User);
const getAll = (req, res) => apiServerHelper.getAll(req, res, ["username"]);
const getOne = (req, res) => apiServerHelper.getOne(req, res, "createdBy");
const deleteUsers = (req, res) => apiServerHelper.deleteMany(req, res);

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const currentUser = req.currentUser._id;
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: newPassword,
      role,
      createdBy: currentUser,
    });
    const data = newUser.toObject();
    delete data.password;
    res.status(201).json({ message: "user created successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
      .populate("createdBy")
      .select("+password");
    if (!user) return res.status(404).json({ message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "wrong username or password" });
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const data = user.toObject();
    delete data.password;
    res.json({ message: `welcome back ${data.username}`, data, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  const { role } = req.body;
  apiServerHelper.updateOne(req, res, { role });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate("createdBy");
    if (!user) return res.status(404).json({ message: "not found" });
    res.json({ message: "operation done successfully", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  register,
  login,
  updateRole,
  deleteUsers,
  getUserProfile,
};
