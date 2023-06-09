const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./auth/passport');
const mongoose  = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const url=process.env.MONGO_URL;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'adqwdfwecsacdsdsdf',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


// let patientRouter = require('./routes/patients/patients');


// const users=require('./routes/users')

app.get('/home', (req, res) => {
    console.log('user : ',req.user);
    res.render('home', {
        name: req.user.username
    });
});

app.get('/login',(req,res)=>{
    res.render('login')
})
app.use('/users',require('./routes/users'))
app.use("/patient", require('./routes/patients/patients'));



mongoose.connect(url)
// console.log(url);
mongoose.connection.on('connected',()=>{
    console.log("mongoose is connected")
    app.listen(PORT,()=>{
        console.log(`http://localhost:`+PORT);
    })
})

mongoose.connection.on('disconnected',()=>{
    console.log("mongoose is disconnected")
    process.exit(1);
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
    process.exit(1);
})


process.on('SIGINT', () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("Mongoose default connection closed");
        process.exit(0);
    })
});
