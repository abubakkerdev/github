const bcrypt = require("bcrypt");
const userModel = require("../../models/user");
const tokenModel = require("../../models/token");
const saltRounds = 11;
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/emailSend");
const passwordTemplate = require("../../utils/passwordTemplate");
const privateKey = process.env.SECRET_KEY;

module.exports = {
  async create(req, res) {
    const { uname, email, batchName, password, phone, token } = req.body;
    const duplicateEmail = await userModel.find({ email });
    const existToken = await tokenModel.find({ token });

    if (duplicateEmail.length == 0 && existToken.length == 1) {
      const hash = bcrypt.hashSync(password, saltRounds);

      const user = new userModel({
        uname,
        email,
        batchName,
        password: hash,
        phone,
      });

      user.save();

      sendEmail(email, passwordTemplate, [email, password]);

      return res.send({
        success: "Registration Successfull.",
        email: user.email,
      });
    } else {
      return res.send({
        error: {
          message: "Credential not match!",
        },
      });
    }
  },

  async addTeacher(req, res) {
    const { uname, email, password, phone, role, department, course, token } =
      req.body;
    const duplicateEmail = await userModel.find({ email });
    const existToken = await tokenModel.find({ token });

    if (duplicateEmail.length == 0 && existToken.length == 1) {
      const hash = bcrypt.hashSync(password, saltRounds);

      const user = new userModel({
        uname,
        email,
        password: hash,
        phone,
        role,
        department,
        course,
      });

      user.save();

      sendEmail(email, passwordTemplate, [email, password]);

      return res.send({
        success: "Registration Successfull.",
        email: user.email,
      });
    } else {
      return res.send({
        error: {
          message: "Credential not match!",
        },
      });
    }
  },

  async allTeacher(req, res) {
    let teachers = await userModel
      .find({ role: "teacher" })
      .populate("department", "title");

    res.send({
      data: teachers,
    });
  },

  async teacherForgotPassword(req, res) {
    const { email, password } = req.body;
    const existEmail = await userModel.find({ email });

    if (existEmail.length == 1) {
      const hash = bcrypt.hashSync(password, saltRounds);

      const infoUpdate = await userModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            password: hash,
          },
        }
      );

      sendEmail(email, passwordTemplate, [email, password]);

      return res.send({
        success: "Email Send Successfull.",
      });
    } else {
      return res.send({
        error: {
          message: "Credential not match!",
        },
      });
    }
  },

  async teacherDetails(req, res) {
    const id = req.params.id;

    try {
      const teacherDetail = await userModel
        .findById(id)
        .populate({
          path: "department",
          select: "title",
          options: { lean: true },
        })
        .populate({
          path: "course",
          select: "_id title",
          options: { lean: true },
        });

      return res.send({ data: teacherDetail });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },

  async signIn(req, res) {
    const { email, password, secretKey } = req.body;
    const emailValid = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g
    ).test(email);

    if (!email) {
      return res.send({
        error: {
          email: "Email field is required!",
        },
      });
    } else if (!emailValid) {
      return res.send({
        error: {
          email: "Your email address is Invalid!",
        },
      });
    } else if (!password) {
      return res.send({
        error: {
          password: "Password field is required!",
        },
      });
    } else {
      let existEmail = await userModel.find({ email });

      if (existEmail.length > 0) {
        let userId = existEmail[0]._id.toString();

        bcrypt.compare(
          password.toString(),
          existEmail[0].password,
          function (err, result) {
            if (result) {
              const token = jwt.sign({ email: email }, privateKey, {
                algorithm: "HS384",
                expiresIn: "7d",
              });
              const tokenVerify = jwt.verify(token, secretKey);
              return res.json({
                success: "Login Successful",
                fullName: existEmail[0].fullName,
                email: existEmail[0].email,
                role: existEmail[0].role,
                userId: userId,
                token: tokenVerify,
              });
            } else {
              return res.send({
                error: {
                  message: "Credential not match",
                },
              });
            }
          }
        );
      } else {
        return res.send({
          error: {
            message: "Credential not match",
          },
        });
      }
    }
  },

  async teacherDelete(req, res) {
    const id = req.params.id;
    try {
      const teacherDelete = await userModel.findOneAndDelete({ _id: id });
      let teacherId = teacherDelete._id.toString();
      console.log(teacherDelete._id.toString());

      return res.send({ data: "Teacher Delete Success.", id: teacherId });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },

  async teacherInfoEdit(req, res) {
    const { id, type, department, course, token } = req.body;

    try {
      const matchId = await userModel.findById({ _id: id });
      const existToken = await tokenModel.find({ token });

      if (existToken.length == 1) {
        if (type === "update") {
          const deleteDepartment = await userModel.findOneAndUpdate(
            { _id: id },
            {
              $unset: {
                department: 1,
                course: 1,
              },
            },
            { new: true }
          );

          if (deleteDepartment) {
            const updateDepartment = await userModel.findOneAndUpdate(
              { _id: id },
              {
                $set: {
                  department: department,
                },
                $push: {
                  course: course,
                },
              },
              { new: true }
            );

            return res.send({
              success: "Update Department & Course.",
            });
          }
        } else if (type === "addmore") {
          if (matchId.course.some((el) => el.toString() === course)) {
            return res.send({
              success: "This info have already exist.",
            });
          } else {
            await userModel.findOneAndUpdate(
              { _id: id },
              {
                $push: {
                  course: course,
                },
              }
            );

            return res.send({
              success: "Update teacher info.",
            });
          }
        }
      } else {
        return res.send({
          error: {
            message: "Credential not match!",
          },
        });
      }
    } catch (error) {
      return res.send({
        error: {
          message: "Credential not match!",
        },
      });
    }
  },

  async teacherCourseDelete(req, res) {
    const { id, course } = req.body;

    const courseDelete = await userModel.findByIdAndUpdate(id, {
      $pull: { course: course },
    });

    return res.send({
      success: "Course delete complete.",
    });
  },
  async allStudent(req, res) {
    let students = await userModel.find({ role: "student" });

    res.send({
      data: students,
    });
  },

  async studentForgotPassword(req, res) {
    const { email, password } = req.body;
    const existEmail = await userModel.find({ email });

    if (existEmail.length == 1) {
      const hash = bcrypt.hashSync(password, saltRounds);

      const infoUpdate = await userModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            password: hash,
          },
        }
      );

      sendEmail(email, passwordTemplate, [email, password]);

      return res.send({
        success: "Email Send Successfull.",
      });
    } else {
      return res.send({
        error: {
          message: "Credential not match!",
        },
      });
    }
  },

  async studentDelete(req, res) {
    const id = req.params.id;
    try {
      const studentDelete = await userModel.findOneAndDelete({ _id: id });
      let studentId = studentDelete._id.toString();

      return res.send({ data: "Student Delete Success.", id: studentId });
    } catch (err) {
      return res.send({ error: "No data found in this ID." });
    }
  },
};
