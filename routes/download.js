const router = require('express').Router();
const File = require('../models/file');


router.get('/:ufid', async(req, res)=> {
    if(req.params.ufid){
        const file = await File.findOne({ufid: req.params.ufid});
        if(!file){
            return res.json({
                success:false,
                message: "Link has bee Expired"
            })


        }
        const filepath = `${__dirname}/../${file.path}`;
        res.download(filepath);
    }
})

module.exports = router;