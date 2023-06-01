const path = require('path');
const express = require('express')
const app = express();

const { body, validationResult } = require('express-validator');
const router = express.Router();
// const nodemailer = require('nodemailer');
const hbs = require('hbs');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const UserModels = require('../models/users')
const CryptoJS = require("crypto-js");
dotenv.config();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

router.post('/signup', [
    body('email').isEmail().withMessage('Not a valid email'),
    body('username').isLength({ min: 3 }).withMessage('Name should be atleast 3 characters'),
    body('password').isLength({ min: 8 }).withMessage('Password length is less than 8')
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

    const { username, password, email } = req.body;
    console.log(req.body)
    var ciphertext = CryptoJS.AES.encrypt(password, process.env.crypto_key).toString();

    let newUser = { username: username, password: ciphertext, email: email };
    try {
        let hasUser = await UserModels.findOne({ email })
        if (hasUser)
            return res.send("user already present");
    }
    catch (err) {
        res.json({ err: "internal server error" })
        res.json({ message: "user created" })
    }
    try {
        if (username.indexOf(' ') >= 0)
            return res.json({ message: "username has white spaces" })
        const user = await UserModels.create(newUser);
        const token = jwt.sign({ user: { id: user._id } }, process.env.private_key);
        // res.json({ message: "user created", token });
        res.redirect('/')
    }
    // res.json("user created",newUser);
    catch (err) {
        console.log("here in error")
        res.json(err);
    }
})

router.post('/login', [
    body('email').isEmail().withMessage('Not a valid email'),
    // body('username').isLength({ min: 3 }).withMessage('Name should be atleast 3 characters'),
    body('password').isLength({ min: 8 }).withMessage('Password length is less than 8')
], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

    const { email, password } = req.body;
    console.log( email, password)

    try {
        let hasUser = await UserModels.findOne({ email })

        if (!hasUser)
            return res.json({ message: "signup before login" })
    }
    catch (err) {
        // console.log("server error 1")
        res.json({ error: "internal server error" })
    }

    try {
        const user = await UserModels.findOne({ email })
        console.log(user)
        const pass_match = (password == CryptoJS.AES.decrypt(user.password, process.env.crypto_key).toString(CryptoJS.enc.Utf8));
        // const user_match = (username == user.username)
        if (!pass_match) {
            return res.json({ message: "username or password does not match" })
        }
        var token = jwt.sign({ user: { id: user._id } }, process.env.private_key)
        console.log(token)
        res.json({ message: "succesfully logged in", token,user})
        // req.render('home')

    }
    catch (e) {
        res.json({ error: "internal server error" })
    }

})

module.exports = router;