const courseModel = require("../../models/course");
const departmentModel = require("../../models/department");

module.exports = {
  async create(req, res) {
    const { title, description } = req.body;

    const duplicateTitle = await departmentModel.find({ title });
    if (title === "") {
      return res.send({
        error: {
          title: "Title field is required!",
        },
      });
    }

    if (duplicateTitle.length == 0) {
      const titleCreate = new departmentModel({
        title,
        description,
      });
      titleCreate.save();
      return res.send({
        success: "Department Name Create Successfull.",
      });
    } else {
      return res.send({
        error: {
          title: "Department name has already taken!",
        },
      });
    }
  },

  async show(req, res) {
    const allDepartment = await departmentModel.find({}).populate({
      path: "courseId",
      select: "-_id title",
      options: { lean: true },
    });

    res.send({
      data: allDepartment,
    });
  },

  async deleteDepartment(req, res) {
    const id = req.params.id;
    try {
      const department = await departmentModel.find({
        _id: id,
      });

      let ids = [];

      department[0].courseId.map((el) => {
        ids.push(el.toString());
      });

      await courseModel.deleteMany({ _id: { $in: ids } });

      await departmentModel.findOneAndDelete({
        _id: id,
      });

      return res.send({ data: "Department Delete Success." });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },

  async detailsDepartment(req, res) {
    const id = req.params.id;

    try {
      const departmentDetail = await departmentModel.findById(id);
      return res.send({ data: departmentDetail });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },

  async updateDepartment(req, res) {
    const { title, description, id } = req.body;

    const duplicateTitle = await departmentModel.find({ title });

    if (title === "") {
      return res.send({
        error: {
          title: "Title field is required!",
        },
      });
    }

    if (duplicateTitle.length >= 1) {
      if (duplicateTitle[0]._id.toString() == id) {
        const updateDepartment = await departmentModel.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              title: title,
              description: description,
            },
          },
          { new: true }
        );

        return res.send({
          success: "Update Department info.",
        });
      } else {
        return res.send({
          error: {
            title: "Department name has already taken!",
          },
        });
      }
    } else if (duplicateTitle.length == 0) {
      const updateDepartment = await departmentModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title: title,
            description: description,
          },
        },
        { new: true }
      );

      return res.send({
        success: "Update Department info.",
      });
    } else {
      return res.send({
        error: {
          title: "Department name has already taken!",
        },
      });
    }
  },
};
