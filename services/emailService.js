const nodemailer = require("nodemailer");

async function sendMail({ message, to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
    html,
  });
  
  if(info.rejected){
      return false
  }else{
      return true
  }
}


module.exports = sendMail;
