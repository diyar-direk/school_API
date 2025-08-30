const Student = require("../../model/student/studentModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServerHelper = new APIServerHelper(Student);
const Class = require("../../model/class/classModel");
const createStudent = async (req, res) => {
  try {
    const { yearLevel, repeatedYears, classId } = req.body;

    const checkClass = await Class.findById(classId);

    if (!checkClass)
      return res.status(404).json({ message: "Class not found." });

    if (checkClass.yearLevel !== yearLevel)
      return res.status(400).json({
        message: "Class year level does not match student year level.",
      });

    if (repeatedYears && repeatedYears.length > 0) {
      const years = repeatedYears.map((e) => e.yearLevel);
      const isRepeated = years.filter(
        (year, index) => years.indexOf(year) !== index
      );

      if (isRepeated.length > 0) {
        return res.status(400).json({
          message: `year "${isRepeated.join(" , ")}" added multiple times.`,
        });
      }

      const isBigger = years.some((e) => e > yearLevel);
      if (isBigger) {
        return res.status(400).json({
          message:
            "repeated year level cannot be greater than current year level.",
        });
      }
    }

    apiServerHelper.createOne(req, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStudents = (req, res) =>
  apiServerHelper.getAll(
    req,
    res,
    ["firstName", "middleName", "lastName"],
    [{ path: "classId", select: "name _id" }]
  );

const getStudentById = (req, res) =>
  apiServerHelper.getOne(req, res, [{ path: "classId", select: "name _id" }]);

const deleteStudents = (req, res) => apiServerHelper.deleteMany(req, res);

const updateStudent = async (req, res) => {
  try {
    const { yearLevel, repeatedYears, classId } = req.body;

    if (classId) {
      const checkClass = await Class.findById(classId);
      if (!checkClass)
        return res.status(404).json({ message: "Class not found." });
      if (checkClass.yearLevel !== yearLevel)
        return res.status(400).json({
          message: "Class year level does not match student year level.",
        });
    }

    if (repeatedYears && repeatedYears.length > 0 && yearLevel) {
      const years = repeatedYears.map((e) => e.yearLevel);
      const isRepeated = years.filter(
        (year, index) => years.indexOf(year) !== index
      );

      if (isRepeated.length > 0) {
        return res.status(400).json({
          message: `year "${isRepeated.join(" , ")}" added multiple times.`,
        });
      }

      const isBigger = years.some((e) => e > yearLevel);
      if (isBigger) {
        return res.status(400).json({
          message:
            "repeated year level cannot be greater than current year level.",
        });
      }
    }

    apiServerHelper.updateOne(req, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  deleteStudents,
  updateStudent,
};
