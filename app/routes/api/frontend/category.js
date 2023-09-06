const express = require("express");
const categoryController = require("../../../controllers/frontend/categoryController");
const _ = express.Router();

_.get("/", categoryController.index);
_.post("/store", categoryController.store);
_.get("/edit", categoryController.edit);
_.post("/update", categoryController.update);
_.get("/destroy", categoryController.destroy);

module.exports = _;
