const router = require("express").Router();

const patientHandler = require('../../controllers/patients/patients');

router.get('/', patientHandler.getPatients);

module.exports = router;