const { Telegraf } = require('telegraf')
const botModules = require('./botModules');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.replyWithHTML('Welcome To FileDroid!\n Upload your files and get Download Link!'))
bot.help((ctx) => ctx.reply('Just upload your File and  get Download Link!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', 'hey', (ctx) => ctx.reply('Hey there'))
bot.use(async (ctx)=> {

	if(ctx.message) {
   	 if(ctx.message.photo){
     		 await botModules.uploadPhoto(ctx);
   	 }
   	 if(ctx.message.document){
        	await botModules.uploadDocument(ctx);
   	 }
   	 if(ctx.message.video){
        	await botModules.uploadVideo(ctx);
   	 }	

	}

})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
