const router = require("express").Router();

const patientHandler = require('../../controllers/patients/patients');

router.get('/', patientHandler.getPatients);
router.get('/addpatient', patientHandler.getAddPatient);

module.exports = router;