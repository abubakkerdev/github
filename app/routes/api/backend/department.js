const express = require("express");
const {
  create,
  show,
  deleteDepartment,
  detailsDepartment,
  updateDepartment
} = require("../../../controllers/backend/departmentController");
const _ = express.Router();

_.post("/create", create);
_.get("/show", show);
_.get("/delete/:id", deleteDepartment);
_.post("/update", updateDepartment);
_.get("/details/:id", detailsDepartment);
 
module.exports = _;




