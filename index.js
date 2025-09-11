require("dotenv").config();
const connection = require("./db");
const port = process.env.PORT || 8000;
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const app = express();
connection();
const morgan = require("morgan");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan(":method :url :status :response-time ms"));

const routers = {
  users: "users/usersRouter",
  admin: "users/adminRouter",
  teachers: "teacher/teacherRouter",
  students: "student/studentRouter",
  classes: "class/classRouter",
  subjects: "subject/subjectRouter",
  "subjects-schedule": "subject/subjectsSchedualeRouter",
  attendance: "attandance/attandanceRouter",
  exams: "exam/examRouter",
  "exam-results": "exam/examResultsRouter",
  statistics: "statistics/statisticsRouter",
};

Object.entries(routers).forEach(([path, router]) => {
  const route = require(`./router/${router}`);
  app.use(`/api/${path}`, route);
});

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
