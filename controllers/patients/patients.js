module.exports.getPatients = (req, res, next) => {
   res.render('patients');
}

module.exports.getAddPatient = (req, res, next) => {
   res.render('addpatient');
}

module.exports.postAddPatient = (req, res, next) => {
   const patient = new Patient(req.body);
   patient.save((err, patient) => {
      if (err) {
         return next(err);
      }
      res.redirect('/patients');
   });
}