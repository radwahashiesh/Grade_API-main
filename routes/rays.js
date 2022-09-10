const express = require('express')

const router = express.Router()
const auth=require("../middleware/auth")

 const {
    getAllrays, addray,update_ray,delete_ray,get_ray
  } = require('../controllers/x_rays_controller')

router.route('/rays/getrays').get(getAllrays)
router.route('/rays/addrays').post(addray)
router.route('/rays/update_ray/:id').put(update_ray)
router.route('/rays/delete_ray/:id').delete(delete_ray)
router.route('/rays/get_one_ray/:name').get(get_ray)


module.exports = router