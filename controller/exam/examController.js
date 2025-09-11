const Exam = require("../../model/exam/examModel");
const Subject = require("../../model/subject/subjectModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServerHelper = new APIServerHelper(Exam);
const getAll = (req, res) =>
  apiServerHelper.getAll(
    req,
    res,
    ["name"],
    [{ path: "subjectId", select: "name" }]
  );
const getOne = (req, res) =>
  apiServerHelper.getOne(req, res, [{ path: "subjectId", select: "name" }]);

const addExam = async (req, res) => {
  const { subjectId } = req.body;
  const isValidSubject = await Subject.findById(subjectId);
  if (!isValidSubject)
    return res.status(404).json({ message: "subject not found" });
  if (isValidSubject.yearLevel !== req.body.yearLevel)
    return res
      .status(400)
      .json({ message: "this subject is not available for your year level" });
  apiServerHelper.createOne(req, res);
};

const deleteExams = (req, res) => apiServerHelper.deleteMany(req, res);

const updateExam = async (req, res) => {
  const { id } = req.params;
  const exam = await Exam.findById(id).populate("subjectId");
  if (!exam) return res.status(404).json({ message: "exam not found" });

  const yearLevel = req.body.yearLevel || exam.yearLevel;

  let subject;
  if (req.body.subjectId) {
    subject = await Subject.findById(req.body.subjectId);
    if (!subject) return res.status(404).json({ message: "subject not found" });
  } else {
    subject = exam.subjectId;
  }

  if (subject.yearLevel !== yearLevel) {
    return res
      .status(400)
      .json({ message: "this subject is not available for your year level" });
  }

  req.body.subjectId = subject._id || subject;

  apiServerHelper.updateOne(req, res);
};

module.exports = {
  getAll,
  getOne,
  addExam,
  deleteExams,
  updateExam,
};
