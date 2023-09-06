const registerTeacherMiddleware = (req, res, next) => {
  const { uname, email, cpassword, password, phone, department, course,role, token } = req.body;

  const emailValid = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g
  ).test(email);

  const numberValid = new RegExp(/^(?:\+88|88)?01[3-9]\d{8}$/g).test(phone);

  if (uname === "") {
    return res.send({
      error: {
        uname: "Name field is required!",
      },
    });
  } else if (email === "") {
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
  } else if (password === "") {
    return res.send({
      error: {
        password: "Password field is required!",
      },
    });
  } else if (password.length < 6) {
    return res.send({
      error: {
        password: "You must type a Minimum of 6 characters!",
      },
    });
  } else if (password !== cpassword) {
    return res.send({
      error: {
        cpassword: "The new password that you entered do not match!",
      },
    });
  } else if (phone === "") {
    return res.send({
      error: {
        phone: "Phone field is required!",
      },
    });
  } else if (!numberValid) {
    return res.send({
      error: {
        phone: "Your phone number is Invalid!",
      },
    });
  } else if (department === "") {
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
  } else if (role === "") {
    return res.send({
      error: {
        role: "Role field is required!",
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

module.exports = registerTeacherMiddleware;
