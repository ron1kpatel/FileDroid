const File = require("../models/file");
const { getDateMonthYear} = require('../services/dateService')
const Admin = require('../models/admin')
require("dotenv").config();
const fetch = require("node-fetch");
const connectDB = require("../config/db");
connectDB();
var someThingWrong = "⚠️ Something went wrong!";

const uploadPhoto = async (ctx) => {
  const photosIndex = ctx.message.photo.length;
  const image = ctx.message.photo[photosIndex - 1];
  const downloadLink = await getDownloadUrl(image.file_id);
  if (!downloadLink) {
    ctx.reply(someThingWrong);
  }

  try {
    // console.log(image.file_id);
    // console.log(downloadLink);
    // console.log(image.file_size);
    // console.log(image.file_unique_id);

    if (
      image.file_id &&
      downloadLink &&
      image.file_unique_id &&
      image.file_size
    ) {
      const uploadStatus = await uploadFile(
        image.file_id,
        image.file_id,
        downloadLink,
        image.file_unique_id,
        image.file_size
      );
      if (uploadStatus) {
        const link = `${process.env.APP_BASE_URL}/files/download/${uploadStatus.ufid}`;
        await ctx.replyWithHTML(
          `
             <b>✅Download Link Is Ready</b>
            `
        );
        await ctx.replyWithHTML(`
        <a href='${link}'>${link}</a>
        `);
      }
    } else {
      ctx.reply(someThingWrong);
    }
  } catch (error) {
    ctx.reply(someThingWrong);
  }
};
const uploadDocument = async (ctx) => {
  var document = ctx.message.document;

  const downloadLink = await getDownloadUrl(document.file_id);
  if (!downloadLink) {
    ctx.reply(someThingWrong);
    return;
  }
  const uploadStatus = await uploadFile(
    document.file_name,
    document.file_id,
    downloadLink,
    document.file_unique_id,
    document.file_size
  );

  if (uploadStatus) {
    // const link = `${process.env.APP_BASE_URL}/files/download/${uploadStatus.ufid}`
    const link = `${process.env.APP_BASE_URL}/files/download/${uploadStatus.ufid}`;
    await ctx.replyWithHTML(`
    <b>✅Download Link Is Ready</b>
    `);
    await ctx.replyWithHTML(`
        <a href='${link}'>${link}</a>
    `);
  } else {
    ctx.reply(someThingWrong);
  }
};
const uploadVideo = async (ctx) => {
  ctx.replyWithHTML(
    `
        <b>Sorry, Sharing Video is under development!</b>\n
        It will be availble soon!
     `
  );
};

// To save File Metdata to Mongo
async function uploadFile(
  fileName,
  fileId,
  downloadLink,
  fileUniqueId,
  fileSize
) {
  const uploadStatus = await File.create({
    filename: fileName,
    isTelegram: true,
    path: downloadLink,
    ufid: fileUniqueId,
    size: fileSize,
  });
  if (uploadStatus) {
    try {
      const adminRes = await Admin.findOne({onDate: getDateMonthYear()});
      //If Date is already there
      if(adminRes){
        
        const updateAdmin = {
          totalTelegramSharedCount: adminRes.totalTelegramSharedCount + 1,
          totalTelegramSharedSize: adminRes.totalTelegramSharedSize + (fileSize / 1024)
        }
        const updateAdminRes =  await Admin.updateOne({onDate: getDateMonthYear()}, updateAdmin);
      }else{
        const adminCrateRes = await Admin.create({
          onDate: getDateMonthYear(),
          totalWebSharedCount: 0,
          totalWenSharedSize: 0,
          totalTelegramSharedCount: 1,
          totalTelegramSharedSize: fileSize / 1024
        })
        if(!adminCrateRes){
          console.error(`Database Error -> Error while creating Admin`)
        }
      }

    } catch (error) {
      console.log(error)
    }
    return uploadStatus;
  }
  if (!uploadStatus) {
    return false;
  }
}
async function getDownloadUrl(file_id) {
  const res = await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${file_id}`
  );
  const data = await res.json();
  if (!data.result) {
    return false;
  }
  const filePath = data.result.file_path;
  if (filePath) {
    const downloadUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    return downloadUrl;
  }
  return false;
}
async function updateDatabaseAdmin(file_size){
  console.log(fileSize)
}

module.exports.uploadPhoto = uploadPhoto;
module.exports.uploadDocument = uploadDocument;
module.exports.uploadVideo = uploadVideo;
