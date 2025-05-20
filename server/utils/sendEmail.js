const nodemailer = require("nodemailer");
const mailConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  //   let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(mailConfig);

  return transporter.sendMail({
    from: "buzbuz2021@gmail.com", // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;

//WORKS FOR GMAIL
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   secure: true,
//   auth: {
//     user: "buzbuz2021@gmail.com",
//     pass: "ugph aram iutn pozb",
//   },
// });

//should work for theplace since i can telnet to only port 465 but it gives a feedback of wrong ssl config
// const transporter = nodemailer.createTransport({
//     host: "mail.theplace.com.ng",
//     secure: true,
//     port: 465,
//     auth: {
//       user: "chukwuebuka.obi@theplace.com.ng",
//       pass: "Tekmainguy_01",
//     },
//   });
