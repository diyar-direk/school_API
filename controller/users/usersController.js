const bcrypt = require("bcryptjs");
const User = require("../../model/users/usersModel");
const jwt = require("jsonwebtoken");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServerHelper = new APIServerHelper(User);
const Teacher = require("../../model/teacher/teacherModel");
const Student = require("../../model/student/studentModel");
const Admin = require("../../model/users/adminModel");

const getAll = (req, res) =>
  apiServerHelper.getAll(req, res, ["username"], ["createdBy", "profileId"]);

const getOne = (req, res) =>
  apiServerHelper.getOne(req, res, ["createdBy", "profileId"]);

const deleteUsers = (req, res) => apiServerHelper.deleteMany(req, res);

const register = async (req, res) => {
  try {
    const { username, password, role, profileId } = req.body;
    const currentUser = req.currentUser?._id;
    const newPassword = await bcrypt.hash(password, 10);

    if (role === "Admin") {
      const admin = await Admin.findById(profileId);
      if (!admin) {
        return res.status(404).json({ message: "admin not found" });
      }
    } else if (role === "Teacher") {
      const teacher = await Teacher.findById(profileId);
      if (!teacher) {
        return res.status(404).json({ message: "teacher not found" });
      }
    } else if (role === "Student") {
      const student = await Student.findById(profileId);
      if (!student) {
        return res.status(404).json({ message: "student not found" });
      }
    }

    const newUser = await User.create({
      username,
      password: newPassword,
      role,
      profileId,
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
      .populate(["createdBy", "profileId"])
      .select("+password");
    if (!user) return res.status(404).json({ message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "wrong username or password" });
    const token = jwt.sign(
      { _id: user._id, role: user.role, profileId: user.profileId?._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const data = user.toObject();
    delete data.password;
    res.json({
      message: `welcome back ${data.profileId?.firstName}`,
      data,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { role, profileId } = req.body;

  if (role === "Admin") {
    const checkIsAdmin = await Admin.findById(profileId);
    if (!checkIsAdmin) {
      return res.status(404).json({ message: "admin not found" });
    }
  } else if (role === "Teacher") {
    const checkIsTeacher = await Teacher.findById(profileId);
    if (!checkIsTeacher) {
      return res.status(404).json({ message: "teacher not found" });
    }
  } else if (role === "Student") {
    const checkIsStudent = await Student.findById(profileId);
    if (!checkIsStudent) {
      return res.status(404).json({ message: "student not found" });
    }
  }
  apiServerHelper.updateOne(req, res, { role, profileId });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate([
      "createdBy",
      "profileId",
    ]);
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
  updateUser,
  deleteUsers,
  getUserProfile,
};
