const File = require("../models/file");
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
        ctx.reply(someThingWrong)
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
 )
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
 const filePath = data.result.file_path;
  if (filePath) {
    const downloadUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    return downloadUrl;
  }
  return false;
}

module.exports.uploadPhoto = uploadPhoto;
module.exports.uploadDocument = uploadDocument;
module.exports.uploadVideo = uploadVideo;