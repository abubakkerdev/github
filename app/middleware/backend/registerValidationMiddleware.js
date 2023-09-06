const registerMiddleware = (req, res, next) => {
  const { uname, email, batchName, password, phone, token } = req.body;

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
  } else if (batchName === "") {
    return res.send({
      error: {
        batchName: "Batch Name field is required!",
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

module.exports = registerMiddleware;
