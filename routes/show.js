const router = require("express").Router();
const File = require("../models/file");
router.get("/:ufid", async (req, res) => {
  try {
    const file = await File.findOne({ ufid: req.params.ufid });

    if (!file) {
      return res.json({success: false, message: 'Link has been expire!', error: "LINKEXPR"})
    }
    if(file.isTelegram){
      return res.json({
        ufid: file.ufid,
        filename: file.filename,
        filesize: file.size,
        downloadLink: file.path
      })
    }
    return res.json({
      ufid: file.ufid,
      filename: file.filename,
      filesize: file.size,
      downloadLink: `${req.protocol}://${req.get('host')}/api/files/download/${file.ufid}`,
    });
  } catch (error) {
  
    return res.json({
      success: false,
      message: "Something went wrong!",
      error: "INTERR"
    })
  }
});

module.exports = router;
