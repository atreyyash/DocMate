const router = require("express").Router();

const patientHandler = require('../../controllers/patients/patients');

router.get('/', patientHandler.getPatients);
router.get('/addpatient', patientHandler.getAddPatient);
router.post('/addpatient', patientHandler.postAddPatient);
router.get('/details', patientHandler.getPatientDetails);
router.get('/addPatientVisit', patientHandler.getAddPatientVisit);
router.post("/addVisit", patientHandler.postAddPatientVisit);
router.get("/search", patientHandler.searchPatient);
router.get("/editPatient", patientHandler.getPatientProfile);
router.post('/updatePatient', patientHandler.updatePatient);

module.exports = router;