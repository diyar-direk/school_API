const ExamResults = require("../../model/exam/examResultsModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServerHelper = new APIServerHelper(ExamResults);
const Exam = require("../../model/exam/examModel");
const Student = require("../../model/student/studentModel");
const addExamResult = async (req, res) => {
  try {
    const { examId, studentId, mark } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    if (mark > exam.mark)
      return res
        .status(400)
        .json({ message: `Mark can not be biger than ${exam.mark}` });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.yearLevel !== exam.yearLevel)
      return res.status(400).json({
        message: `this exam for year ${exam.yearLevel} but this student in year ${student.yearLevel}`,
      });
    apiServerHelper.createOne(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExamResults = (req, res) => {
  apiServerHelper.getAll(
    req,
    res,
    [],
    [
      { path: "studentId", select: "_id firstName middleName lastName" },
      { path: "examId", select: "_id name" },
    ]
  );
};

const getExamResultById = (req, res) =>
  apiServerHelper.getOne(req, res, [
    { path: "examId", select: "_id name" },
    { path: "studentId", select: "_id firstName middleName lastName" },
  ]);

const deleteExamResults = (req, res) => apiServerHelper.deleteMany(req, res);

const updateExamResult = async (req, res) => {
  try {
    const { examId, studentId, mark } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    if (mark > exam.mark)
      return res
        .status(400)
        .json({ message: `Mark can not be biger than ${exam.mark}` });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.yearLevel !== exam.yearLevel)
      return res.status(400).json({
        message: `this exam for year ${exam.yearLevel} but this student in year ${student.yearLevel}`,
      });
    apiServerHelper.updateOne(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExamResult,
  getExamResults,
  getExamResultById,
  deleteExamResults,
  updateExamResult,
};
