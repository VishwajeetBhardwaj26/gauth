const express  = require("express");
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const passport = require('passport')
const PORT  = process.env.PORT || 5000
require('./models/User')
require('./services/passport')
const mongoURI='mongodb+srv://dbuser:mKIy1AGNXC5lgGE9@cluster0.2bzzu.mongodb.net/?retryWrites=true&w=majority';
const cookieKey='dhsgkjljhgsdofghwoiitjwefnsdfjkhdfoidf';


mongoose.connect(mongoURI,()=>{
    console.log("connected to db")
})

app.use(
    cookieSession({
        maxAge:30 * 24 * 60 * 60 *1000,
        keys:[cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session())

require('./routes/authRoute')(app)


app.listen(PORT,()=>{
    console.log("server running on "+ PORT)
})