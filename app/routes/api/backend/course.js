const express = require("express");
const {
  create,
  showWithDepartment,
  allCourse,
  deleteCourse,
  editCourse,
  updateCourse
} = require("../../../controllers/backend/courseController");
const _ = express.Router();

_.post("/create", create);
_.get("/allCourse", allCourse);
_.post("/showwithdepartment", showWithDepartment);
_.get("/delete/:id", deleteCourse);
_.get("/edit/:id", editCourse);
_.post("/update", updateCourse);

module.exports = _;
