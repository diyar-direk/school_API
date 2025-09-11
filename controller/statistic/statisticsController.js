const parsedQueryHelper = require("../../utils/parsedQueryHelper");
const User = require("../../model/users/usersModel");
const Teacher = require("../../model/teacher/teacherModel");
const Student = require("../../model/student/studentModel");
const Class = require("../../model/class/classModel");
const Subject = require("../../model/subject/subjectModel");
const dataCountStatistic = async (req, res) => {
  try {
    const parsedQuery = parsedQueryHelper(req.query);
    const [teacherStats, studentStats, users, classes, subjects] =
      await Promise.all([
        Teacher.aggregate([
          { $match: parsedQuery },
          {
            $group: {
              _id: "$gender",
              count: { $sum: 1 },
            },
          },
        ]),
        Student.aggregate([
          { $match: parsedQuery },
          {
            $group: {
              _id: "$gender",
              count: { $sum: 1 },
            },
          },
        ]),
        User.countDocuments(parsedQuery),
        Class.countDocuments(parsedQuery),
        Subject.countDocuments(parsedQuery),
      ]);

    const maleTeacher = teacherStats.find((t) => t._id === "Male")?.count || 0;
    const femaleTeacher =
      teacherStats.find((t) => t._id === "Female")?.count || 0;

    const maleStudent = studentStats.find((s) => s._id === "Male")?.count || 0;
    const femaleStudent =
      studentStats.find((s) => s._id === "Female")?.count || 0;

    res.json({
      message: "operation done successfully",
      data: {
        users,
        teacher: {
          total: maleTeacher + femaleTeacher,
          male: maleTeacher,
          female: femaleTeacher,
        },
        student: {
          total: maleStudent + femaleStudent,
          male: maleStudent,
          female: femaleStudent,
        },
        classes,
        subjects,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const classesStudentCount = async (req, res) => {
  try {
    const parsedQuery = parsedQueryHelper(req.query);

    const { yearLevel } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const matchStage = {
      ...parsedQuery,
      ...(yearLevel ? { yearLevel: parseInt(yearLevel) } : {}),
    };

    const basePipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "classId",
          as: "students",
        },
      },
      {
        $addFields: {
          studentsCount: { $size: "$students" },
        },
      },
      {
        $project: {
          students: 0,
          createdBy: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
      { $sort: { yearLevel: 1, studentsCount: -1 } },
    ];

    const pipeline = [
      {
        $facet: {
          data: [...basePipeline, { $skip: skip }, { $limit: limit }],
          totalCount: [...basePipeline, { $count: "count" }],
        },
      },
    ];

    const result = await Class.aggregate(pipeline);

    const data = result[0].data;
    const totalCount = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      message: "operation done successfully",
      results: data.length,
      totalCount,
      totalPages,
      page,
      limit,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { dataCountStatistic, classesStudentCount };
