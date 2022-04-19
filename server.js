require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const PORT = process.env.PORT || 80000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
//Connecting to DB
const connectDB = require('./config/db')
connectDB();

// Routes
app.use('/api/files/upload', require('./routes/files'));
app.use('/api/files/show', require('./routes/show'))
app.use('/api/files/download', require('./routes/download'))
app.use('/api/files/send', require('./routes/sendLink'))
// End Routes
//Run Bot
try{
    require('child_process').fork('./TelegramBot/bot')
}catch(err){
    console.log(err)
}

app.use(express.static('client/build'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/build/' , '/index.html'));
});

app.listen(PORT, ()=> {
   
     console.log(`${PORT}] Server is running`)
})

