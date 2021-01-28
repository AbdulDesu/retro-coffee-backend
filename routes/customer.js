const express = require('express')
const router = express.Router()

const { updateCustomerByCsId, getCustomerByCsId } = require('../src/controllers/CustomerController')

const uploadImage = require('../src/middleware/multer')

router.put('/:csId', uploadImage, updateCustomerByCsId)
router.get('/:csId', getCustomerByCsId)

module.exports = router
