const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth")

 const {
   login, registeradmin
  } = require('../controllers/adminCtrl')



router.route('/admin/loginAdmin').post(login)
router.route('/admin/registerAdmin').post(registeradmin)




module.exports=router