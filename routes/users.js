const path = require('path');
const express = require('express')
const app = express();
const passport = require('passport');
const router = express.Router();
const hbs = require('hbs');
const dotenv = require('dotenv')
const User = require('../models/users')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

dotenv.config();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(cookieParser());

const userController = require('../controllers/userController');

router.post('/signup', async (req, res, next) => {
    const { username, password, email } = req.body;
    // console.log(req.body)
    
    try {
        let user=await User.findOne({email});
        if(user)
        {
            req.flash('errors', "User Already exists!");
            res.redirect('/login');
        }
        else{
            bcrypt.genSalt(saltRounds,async function(err,salt){
                bcrypt.hash(password,salt, async function(err,hash){
                    try {
                        await User.create({
                            email,
                            username,
                            password:hash
                        })
                        res.redirect('/home');
                    }
                    catch (err) {
                        res.send(err);
                    }
                })
            })
        }
    }
    catch (err) {
        res.send(err);
    }
})

router.post('/login',
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/home');
});

router.get('/auth/facebook',
    passport.authenticate('facebook'),
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
});

router.get('/profile', userController.getProfile);

module.exports = router;