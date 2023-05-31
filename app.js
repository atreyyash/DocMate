const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const bodyParser = require('body-parser');
hbs.registerPartials(__dirname + '/views/partials/');

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
let patientRouter = require('./routes/patients/patients');

app.get('/', (req, res) => {
    res.render('home');
});

app.use("/patient", patientRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:`+PORT);
})