const nodemailer = require("nodemailer");
const mailUsername = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;

const emailVerification = async (email, ...agr) => {
  let template = agr[0];
  let data = agr[1];

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUsername,
      pass: mailPassword,
    },
  });

  let info = await transporter.sendMail({
    from: "Creative 24/7 online support",
    to: email,
    subject: "Email & Password for user.",
    html: template(data),
  });
};

module.exports = emailVerification;
