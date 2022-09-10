const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth")

 const {
    registerDoctor,
    getAllDoctor,
    login,
    forgetPassword,
    resetPassword,
    
  } = require('../controllers/doctorCtrl')


router.route('/doctor/alldoctor').get(getAllDoctor)
router.route('/doctor/adddoctor').post(registerDoctor)
router.route('/doctor/logindoctor').post(login)
router.route('/doctor/forgetPassword').post(forgetPassword)
router.route('/doctor/resetpassword').post(resetPassword)








module.exports=router