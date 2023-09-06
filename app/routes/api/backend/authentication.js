const express = require("express");
const {
  create,
  signIn,
  addTeacher,
  allTeacher,
  teacherDetails,
  teacherDelete,
  teacherForgotPassword,
  teacherInfoEdit,
  teacherCourseDelete,
  allStudent,
  studentForgotPassword,
  studentDelete
} = require("../../../controllers/backend/authenticationController");
const registerMiddleware = require("../../../middleware/backend/registerValidationMiddleware");
const registerTeacherMiddleware = require("../../../middleware/backend/registerTeacherMiddleware");
const editTeacherMiddleware = require("../../../middleware/backend/editTeacherMiddleware");
const _ = express.Router();

_.post("/register", registerMiddleware, create);
_.post("/register/teacher", registerTeacherMiddleware, addTeacher);
_.post("/teacher/forgotpassword", teacherForgotPassword);
_.post("/student/forgotpassword", studentForgotPassword);
_.get("/teacher/details/:id", teacherDetails);
_.get("/teacher/delete/:id", teacherDelete);
_.get("/student/delete/:id", studentDelete);
_.post("/teacher/edit",editTeacherMiddleware, teacherInfoEdit);
_.post("/teacher/course/delete", teacherCourseDelete);
_.get("/allteacher", allTeacher);
_.get("/allstudent", allStudent);
_.post("/login", signIn);

module.exports = _;
