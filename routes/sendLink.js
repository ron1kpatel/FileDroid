const router = require("express").Router();
const File = require("../models/file");
/* 
    Email Request json 
    {
        ufid: "rier09849423k4fasdf",
        emailTo: "example@gmail.com",
        message: "Hello Person! Sem 5 Sample Project",

    }
*/
router.post("/email", async (req, res) => {
  const { ufid, emailTo, message } = req.body;

  // Validation
  if (!ufid || !emailTo) {
    return res.json({
      success: "false",
      message: "All Fields Are Required!",
    });
  }
  // Message size
  if (message.length >= 500) {
    return res.json({
      success: false,
      message: "Message is too long.",
    });
  }

  // Get file data from database
  const file = await File.findOne({ ufid });

  // If File data not found
  if (!file) {
    return res.json({
      success: false,
      message: "Link has been expire!",
    });
  }
  // If File already sent
  if (file.emailReceiver) {
    return res.json({
      success: false,
      message: "Email already sent!",
    });
  }

  // Saving emailReceiver
  file.emailReceiver = emailTo;
  file.emailMessage = message;

  const dbRespone = await file.save();

  // Send email
  try {
    const sendMail = require("../services/emailService");

    var mailSendStatus =  sendMail({
      message,
      to: emailTo,
      subject: "FileDroid File Sharing",
      text: `${message}`,
      html: require("../services/emailTemplate")({
        message,
        downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.ufid}`,
        size: parseInt(file.size / 1000) + "KB",
        expires: "24 Hours",
      }),
    });
    if(mailSendStatus){
        return res.json({
            success: true,
            message: "Email Sent!"
        })
    }else{
        return res.json({
            success: false,
            message:"Something went wrong!"
        })
    }
  } catch (err) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/sms", async(req, res)=> {
  
})
module.exports = router;
