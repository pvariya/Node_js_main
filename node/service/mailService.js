const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "t96456297@gmail.com",
    pass: "mnkb ebqh lgiw govg",
  },
});

const sendMail = (to, subject, html) => {
  const mailOptions = {
    from: "variyapurv4211@gmail.com",
    to: to,
    subject,
    html,
  };
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
