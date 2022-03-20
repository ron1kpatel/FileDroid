const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
   onDate: {type: String},
   totalWebSharedCount: {type: Number},
   totalWenSharedSize: {type: Number},
   totalTelegramSharedCount: {type: Number},
   totalTelegramSharedSize: {type: Number}
}, {timestamps: true});


module.exports = mongoose.model('Admin', adminSchema);