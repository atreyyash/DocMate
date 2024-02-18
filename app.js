const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./auth/passport');
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'public')));
let MongoDBStore = require('connect-mongodb-session')(session);
const userHandler = require('./controllers/userController');

let store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/pms',
    collection: 'mySession'
});

const dotenv = require('dotenv');

dotenv.config();

const url=process.env.MONGO_URL;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'adqwdfwecsacdsdsdf',
    resave: false,
    saveUninitialized: true,
    store: store
}));
const flash = require('connect-flash');
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
    res.render('error');
});

hbs.handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});

// let patientRouter = require('./routes/patients/patients');
// const users=require('./routes/users')
app.get('/', (req, res) => {
    // res.render('index')
    // console.log(req.user);
    // if (req.user) {
    //     res.render('home');
    // }
    // else {
    //     res.render("index");
    // }
    res.redirect("/home");
})
app.get('/home', async (req, res) => {
    // console.log('user : ', req.user);
    // console.log("base url: ", req.originalUrl);

    if (req.user) {
        try {
            const dash = await userHandler.getDashboard(req.user._id);
            res.render('home', {
                name: req.user.username,
                url: req.originalUrl,
                dash
            });

        }
        catch (err) {
            req.flash("error", err);
        }
    }
    else {
        res.redirect('/login');
    }
});

app.get('/signup', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    const error = req.flash().errors || [];
    res.render('login', { error })
});

app.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.send('Logged out');
        // res.redirect('/');
    });
});

app.use('/users',require('./routes/users'))
app.use("/patient", require('./routes/patients/patients'));



mongoose.connect(url).then(() => {
    console.log("mongoose is connected")
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    })
})
    .catch((err) => {
        console.log("Connection disconnected " + err)
})
// console.log(url);
// mongoose.connection.on('connected',()=>{
//     console.log("mongoose is connected")
//     app.listen(PORT,()=>{
//         console.log(`http://localhost:`+PORT);
//     })
// })

// mongoose.connection.on('disconnected', () => {
//     console.log("mongoose is disconnected")
//     process.exit(1);
// })

// mongoose.connection.on('error',(err)=>{
//     console.log(err);
//     process.exit(1);
// })


process.on('SIGINT', () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("Mongoose default connection closed");
        process.exit(0);
    })
});
