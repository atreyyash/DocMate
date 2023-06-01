module.exports.getPatients = (req, res, next) => {
   res.render('patients');
}

module.exports.getAddPatient = (req, res, next) => {
   res.render('addpatient');
}