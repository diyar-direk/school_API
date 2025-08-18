require("dotenv").config();
const connection = require("./db");
const port = process.env.PORT || 8000;
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const app = express();
connection();

app.use(express.json());
app.use(helmet());
app.use(cors());
const userRouter = require("./router/users/usersRouter");
const subjectRouter = require("./router/subject/subjectRouter");
const classesRouter = require("./router/class/classRouter");
const examRouter = require("./router/exam/examRouter");
app.use("/api/users", userRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/classes", classesRouter);
app.use("/api/exams", examRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
