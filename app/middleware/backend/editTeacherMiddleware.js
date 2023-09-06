const editTeacherMiddleware = (req, res, next) => {
  const { department, course, token } = req.body;

  if (department === "") {
    return res.send({
      error: {
        department: "Department field is required!",
      },
    });
  } else if (course === "") {
    return res.send({
      error: {
        course: "Course field is required!",
      },
    });
  } else if (token === "") {
    return res.send({
      error: {
        token: "Token field is required!",
      },
    });
  } else {
    next();
  }
};

module.exports = editTeacherMiddleware;
