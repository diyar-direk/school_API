const Teacher = require("../../model/teacher/teacherModel");
const Subject = require("../../model/subject/subjectModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServer = new APIServerHelper(Teacher);
const createTeacher = async (req, res) => {
  const { yearLevel, subjects } = req.body;
  const checkSubjectsYearLevel = await Subject.find({
    _id: { $in: subjects },
  });
  if (subjects.length !== checkSubjectsYearLevel.length)
    return res.status(404).json({ message: "Some subjects not found" });
  const isNotSame = checkSubjectsYearLevel.filter(
    (sub) => !yearLevel.includes(sub.yearLevel)
  );
  if (isNotSame.length > 0) {
    return res.status(400).json({
      message: "Some subjects do not match the year level",
    });
  }
  apiServer.createOne(req, res);
};

const getTeachers = (req, res) =>
  apiServer.getAll(
    req,
    res,
    ["firstName", "middleName", "lastName"],
    [{ path: "subjects", select: "_id name" }]
  );

const getTeacher = (req, res) =>
  apiServer.getOne(req, res, [{ path: "subjects", select: "_id name" }]);

const deleteTeachers = (req, res) => apiServer.deleteMany(req, res);

const updateTeacher = async (req, res) => {
  const { yearLevel, subjects } = req.body;
  if (yearLevel && subjects) {
    const checkSubjectsYearLevel = await Subject.find({
      _id: { $in: subjects },
    });
    if (subjects.length !== checkSubjectsYearLevel.length)
      return res.status(404).json({ message: "Some subjects not found" });
    const isNotSame = checkSubjectsYearLevel.filter(
      (sub) => !yearLevel.includes(sub.yearLevel)
    );
    if (isNotSame.length > 0) {
      return res.status(400).json({
        message: "Some subjects do not match the year level",
      });
    }
  }
  apiServer.updateOne(req, res);
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacher,
  deleteTeachers,
  updateTeacher,
};
