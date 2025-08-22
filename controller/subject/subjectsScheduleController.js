const SubjectsSchedule = require("../../model/subject/subjectsScheduleModel");
const Subject = require("../../model/subject/subjectModel");
const Classes = require("../../model/class/classModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServer = new APIServerHelper(SubjectsSchedule);
const addSubjectsSchedule = async (req, res) => {
  try {
    const isClassExist = await Classes.findById(req.body.classId);
    if (!isClassExist)
      return res.status(404).json({ message: "Class not found" });
    const { subjectId } = req.body;
    const isSubjectExist = await Subject.findById(subjectId);
    if (!isSubjectExist)
      return res.status(404).json({ message: "Subject not found" });

    if (isClassExist.yearLevel !== isSubjectExist.yearLevel)
      return res.status(400).json({
        message: "Class and subject year levels do not match",
      });
    apiServer.createOne(req, res);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSubjectsSchedule = (req, res) => {
  req.sort = { ...req.sort, startTime: 1 };
  apiServer.getAll(req, res, [], ["classId", "createdBy", "subjectId"]);
};

const getOne = (req, res) =>
  apiServer.getOne(req, res, ["classId", "createdBy", "subjectId"]);

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const subjectsSchedule = await SubjectsSchedule.findById(id).populate([
      "classId",
      "subjectId",
    ]);
    if (!subjectsSchedule)
      return res.status(404).json({ message: "Subjects schedule not found" });

    let classId;
    let subjectId;

    if (!req.classId) {
      classId = subjectsSchedule.classId;
    } else {
      const classData = await Classes.findById(req.classId);
      if (!classData)
        return res.status(404).json({ message: "Class not found" });
      classId = classData;
    }
    if (!req.subjectId) {
      subjectId = subjectsSchedule.subjectId;
    } else {
      const subjectData = await Subject.findById(req.subjectId);
      if (!subjectData)
        return res.status(404).json({ message: "Subject not found" });
      subjectId = subjectData;
    }

    if (subjectId.yearLevel !== classId.yearLevel)
      return res.status(400).json({
        message: "Class and subject year levels do not match",
      });
    apiServer.updateOne(req, res);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteSchedule = async (req, res) => apiServer.deleteMany(req, res);
module.exports = {
  addSubjectsSchedule,
  getSubjectsSchedule,
  updateSchedule,
  getOne,
  deleteSchedule,
};
