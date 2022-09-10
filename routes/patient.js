const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth")
 const {
  registerPatient,
  getAllPateient,
    login,forgetPassword,resetPassword
  } = require('../controllers/patient_controller')

router.route('/patient/addPatient').post(registerPatient)
router.route('/patient/patientLogin').post(login )
router.route('/patient/allpatient').get(getAllPateient )

router.route('/patient/forgetpass').post(forgetPassword )
router.route('/patient/resetpass').post(resetPassword )


module.exports = router