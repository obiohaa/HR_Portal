const sendEmail = require("./sendEmail");

const sendGuarantorEmailTwo = async ({ firstName, lastName, email, verificationToken, origin }) => {
  const verifyEmail = `${origin}/user/verify_email?token=${verificationToken}&email=${email}`;
  //making the first work capital letter
  const first_Name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const last_Name = lastName.charAt(0).toUpperCase() + lastName.slice(1);

  return sendEmail({
    to: email,
    subject: "Guarantor Form",
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Guarantor Form</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Century Gothic", CenturyGothic, AppleGothic, sans-serif;
      background-color: #f4f4f4;
    ">
    <table align="center" width="" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td
          align="center"
          style="
            width: 600px;
            padding: 20px 0;
            background-color: hsl(0, 100%, 45%);
            justify-content: center;
            align-items: center;
          ">
          <!-- Logo Image -->
          <img
            src="https://res.cloudinary.com/theplace-com-ng/image/upload/v1746806282/dplace_vrsag1.png"
            alt="The_Place_Logo"
            width="150"
            style="display: block; float: left; padding-left: 20px" />
        </td>
      </tr>

      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background-color: #ffffff; padding: 20px">
            <tr>
              <td style="text-align: left; color: #333">
                <h3 style="margin-top: 0">Dear Sir/Ma</h3>
                <p style="font-size: 15px;">
I hope this message finds you well.
                </p>
                <p style="font-size: 15px;">
                  We are reaching out to kindly inform you that ${first_Name} ${last_Name}, an employee with our organization, has listed you as a guarantor.
                </p>
                <p style="font-size: 15px;">
                  We would appreciate it if you could take a few moments to complete the guarantor form by clicking the link here:
                  <a href="${verifyEmail}" style="text-decoration: none;">Verify Email</a>.
                </p>
                <p>
                Your support in this process is greatly appreciated. Should you have any questions or require further information, please do not hesitate to contact us HR@thaplce.com.ng
                </p>
                <p style="font-size: 15px;">Best regards,<br />The Place HR Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr style="background: linear-gradient(
        360deg,
        rgba(42, 123, 155, 1) 0%,
        rgba(199, 87, 87, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );">
        <td align="center" style="padding: 20px; font-size: 14px; color: black">
          © 2025 The Place HR Team. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>`,
  });
};

module.exports = sendGuarantorEmailTwo;
