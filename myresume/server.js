const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const Message = require('./models/message')
const messageRouter = require('./routes/messages');
// const methodOverride = require('method-override');
const app = express();

const MONGODB_URI = process.env.MONGODB_URI ||  'mongodb://localhost/resume'

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true,
useUnifiedTopology: true, useCreateIndex: true })


// app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// app.use(methodOverride('_method'))

app.use(cors());

app.get("/", async (req, res) => {
// console.log(req.body);
const messages = await Message.find().sort({
    createdAt: 'desc'
})
res.render('messages/index', {message: message});
});

app.post("/thanks", (req, res) => {
    console.log(req.body);
  res.status(200);
  return res.json({ message: 'Message sent' });
});

app.use('/messages', messageRouter)

// Not Found Page
app.get("*", (req, res) => {
    res.render('messages/notfound', { message: "Not Found"})
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
