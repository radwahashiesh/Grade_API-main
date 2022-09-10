const express = require('express')

const router = express.Router()

 const {
    add_drug,get_drugs,update_drug,delete_drug,getAllDrug
  } = require('../controllers/drugs_controller')


router.route('/drugs/add_drug').post(add_drug)
router.route('/drugs/get_drug/:name').get(get_drugs)
router.route('/drugs/update_drug/:id').put(update_drug)
router.route('/drugs/delete_drug/:id').delete(delete_drug)
router.route('/drugs/getAllDrugs').get(getAllDrug)

module.exports = router