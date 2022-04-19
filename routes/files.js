const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4: uuid4 } = require("uuid");
const File = require("../models/file");
const Admin = require('../models/admin');
const {getDateMonthYear} = require('../services/dateService');
// Multer config
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    console.log();
    var originalfullName = file.originalname.split('.');
    var originalFilename = originalfullName[0];
    const uniqueName = `${originalFilename} ${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: {
    fileSize: 1000000 * 400,
  },
}).single("myFile");
//Upload file
router.post("/", (req, res) => {
  // Store file
  upload(req, res, async (err) => {
    // Validate request
    if (!req.file) {
      return res.json({ success: false, message: "File is not recieved" });
    }
    if (err) {
      return res.send({ success: false, message: err.message });
    }

    // Store into Database
    const file = new File({
      filename: req.file.filename,
      ufid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });

    const respones = await file.save();
    if(respones){
      const adminResponse = await Admin.find({onDate: getDateMonthYear()})
      // If Date is alreay there
      if(adminResponse.length > 0){
         const update = {
          totalWebSharedCount: adminResponse[0].totalWebSharedCount + 1,
          totalWenSharedSize: adminResponse[0].totalWenSharedSize + (respones.size / 1024) //response.size is in Bytes, Converting into KB
         }
         try{
          const adminUpdateRes = await Admin.updateOne({onDate: getDateMonthYear()}, update);
         }catch(err){
           console.log(err);
         }
      // If not then create new Day
      }else{
        try{
          const adminCreateRes = await Admin.create({
            onDate: getDateMonthYear(),
            totalWebSharedCount: 1,
            totalWenSharedSize: respones.size / 1024,
            totalTelegramSharedCount: 0,
            totalTelegramSharedSize: 0
          })
      
        }catch(err){
          console.log(err);
        }
      }
    }

    return res.json({
      success: true,
      file: `${req.protocol}://${process.env.HOST_URL}/files/download/${respones.ufid}`,
      ufid: respones.ufid,
    });
  });

  // Send response -> Link
});
module.exports = router;
