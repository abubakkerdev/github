const departmentModel = require("../../models/department");
const courseModel = require("../../models/course");

module.exports = {
  async create(req, res) {
    const { title, department, description } = req.body;

    if (title === "") {
      return res.send({
        error: {
          title: "Title field is required!",
        },
      });
    }

    if (department === "") {
      return res.send({
        error: {
          department: "Department field is required!",
        },
      });
    }

    const duplicateTitle = await courseModel.find({ title });

    if (duplicateTitle.length == 0) {
      try {
        const checkId = await departmentModel.find({ _id: department });

        const courseCreate = new courseModel({
          title,
          description,
          departmentId: department,
        });
        courseCreate.save();

        const departmentUpdate = await departmentModel.findOneAndUpdate(
          { _id: department },
          {
            $push: {
              courseId: courseCreate._id,
            },
          }
        );

        return res.send({
          success: "Course Create Successfull.",
        });
      } catch (error) {
        return res.send({
          error: {
            message: "Department Id is Invalid!",
          },
        });
      }
    } else {
      return res.send({
        error: {
          title: "This Course Title has already taken!",
        },
      });
    }
  },
  
  async showWithDepartment(req, res) {
    const { departmentId } = req.body;

    const allDepartment = await courseModel
      .find({ departmentId })
      .select({ title: 1 });

    res.send({
      data: allDepartment,
    });
  },

  async allCourse(req, res) {
    const courseAll = await courseModel.find({}).populate({
      path: "departmentId",
      select: "_id title",
      options: { lean: true },
    });

    res.send({
      data: courseAll,
    });
  },

  async deleteCourse(req, res) {
    const id = req.params.id;
    try {
      const course = await courseModel.find({
        _id: id,
      });

      const departmentUpdate = await departmentModel.findOneAndUpdate(
        { _id: course[0].departmentId.toString() },
        { $pull: { courseId: id } }
      );

      const courseDelete = await courseModel.findOneAndDelete({
        _id: id,
      });

      return res.send({ data: "Course Delete Success." });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },

  async editCourse(req, res) {
    const id = req.params.id;
    try {
      const courseInfo = await courseModel
        .find({
          _id: id,
        })
        .populate({
          path: "departmentId",
          select: "_id title",
          options: { lean: true },
        });

      return res.send({ data: courseInfo });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },

  async updateCourse(req, res) {
    const { title, departmentId, description, id } = req.body;

    if (title === "") {
      return res.send({
        error: {
          title: "Title field is required!",
        },
      });
    }

    if (departmentId === "") {
      return res.send({
        error: {
          department: "Department field is required!",
        },
      });
    }

    const duplicateTitle = await courseModel.find({ title });
    const duplicateId = await courseModel.find({ _id: id });

    if (duplicateTitle.length >= 1) {
      if (duplicateTitle[0]._id.toString() == id) {
        const courseUpdate = await courseModel.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              title,
              description,
              departmentId,
            },
          }
        );

        if (duplicateTitle[0].departmentId.toString() !== departmentId) {
          const departUpdate = await departmentModel.findOneAndUpdate(
            { _id: departmentId },
            {
              $push: {
                courseId: id,
              },
            }
          );

          const departmentUpdate = await departmentModel.findOneAndUpdate(
            { _id: duplicateTitle[0].departmentId.toString() },
            { $pull: { courseId: id } }
          );
        }

        return res.send({
          success: "Update Course info.",
        });
      } else {
        return res.send({
          error: {
            title: "Course name has already taken!",
          },
        });
      }
    } else if (duplicateTitle.length == 0) {
      const courseUpdate = await courseModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title,
            description,
            departmentId,
          },
        }
      );

      if (duplicateId[0].departmentId.toString() !== departmentId) {
        const departUpdate = await departmentModel.findOneAndUpdate(
          { _id: departmentId },
          {
            $push: {
              courseId: id,
            },
          }
        );

        const departmentUpdate = await departmentModel.findOneAndUpdate(
          { _id: duplicateId[0].departmentId.toString() },
          { $pull: { courseId: id } }
        );
      }

      return res.send({
        success: "Update Course info.",
      });
    } else {
      return res.send({
        error: {
          title: "Course name has already taken!",
        },
      });
    }
  },
};
