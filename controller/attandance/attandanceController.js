const mongoose = require("mongoose");
const Attendance = require("../../model/attendance/attandanceModel");
const Class = require("../../model/class/classModel");
const Student = require("../../model/student/studentModel");
const APIServerHelper = require("../../utils/apiServerHelper");
const apiServer = new APIServerHelper(Attendance);
const createAttandance = async (req, res) => {
  try {
    const { classId, studentId } = req.body;
    const checkClass = await Class.findById(classId);
    if (!checkClass)
      return res.status(404).json({ message: "class not found" });
    const checkStudent = await Student.findById(studentId);
    if (!checkStudent)
      return res.status(404).json({ message: "student not found" });

    if (!checkStudent.classId.equals(classId))
      return res.status(400).json({
        message: "this student not in chosen class",
      });
    apiServer.createOne(req, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
const updateAttandance = (req, res) => {
  const { status, date } = req.body;
  apiServer.updateOne(req, res, { status, date });
};
const deleteAttandance = (req, res) => apiServer.deleteMany(req, res);

const getAttendance = async (req, res) => {
  try {
    const { classId, studentId, date, page = 1, limit = 10 } = req.query;

    if (!classId) {
      return res.status(400).json({ message: "please select class first" });
    }

    const selectedDate = date ? new Date(date) : new Date();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    startOfMonth.setHours(0, 0, 0, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const matchStudentStage = studentId
      ? { $match: { _id: new mongoose.Types.ObjectId(studentId) } }
      : null;

    const basePipeline = [
      ...(matchStudentStage ? [matchStudentStage] : []),
      { $match: { classId: new mongoose.Types.ObjectId(classId) } },
      {
        $lookup: {
          from: "attendances",
          let: { studentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$studentId", "$$studentId"] },
                    { $eq: ["$classId", new mongoose.Types.ObjectId(classId)] },
                    { $gte: ["$date", startOfMonth] },
                    { $lte: ["$date", endOfMonth] },
                  ],
                },
              },
            },
            { $project: { _id: 1, date: 1, status: 1 } },
            { $sort: { date: 1 } },
          ],
          as: "records",
        },
      },
      {
        $lookup: {
          from: "classes",
          localField: "classId",
          foreignField: "_id",
          as: "classInfo",
        },
      },
      { $unwind: "$classInfo" },
      {
        $project: {
          _id: 0,
          studentId: "$_id",
          studentName: {
            $concat: ["$firstName", " ", "$middleName", " ", "$lastName"],
          },
          className: "$classInfo.name",
          yearLevel: "$classInfo.yearLevel",
          records: 1,
        },
      },
      { $sort: { studentName: 1 } },
    ];

    const pipeline = [
      {
        $facet: {
          data: [
            ...basePipeline,
            { $skip: (page - 1) * parseInt(limit) },
            { $limit: parseInt(limit) },
          ],
          totalCount: [...basePipeline, { $count: "count" }],
        },
      },
    ];

    const result = await Student.aggregate(pipeline);

    const data = result[0].data;
    const totalCount = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      results: data.length,
      totalCount,
      data,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      message: "operation done successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAttandance,
  updateAttandance,
  deleteAttandance,
  getAttendance,
};
