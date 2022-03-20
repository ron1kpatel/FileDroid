const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {type: String, required: true},
    isTelegram: {type:Boolean, required: false},
    path: {type: String, required: true},
    size: {type: Number, required: true},
    ufid: {type: String, required:true},
    emailReceiver: {type:String, required: false},
    emailsenderMessage: {type: String, required: false},
    smsReceiver: {type: String, require: false},
    smsSenderMessage: {type: String, required: false},
}, {timestamps: true});


module.exports = mongoose.model('File', fileSchema);