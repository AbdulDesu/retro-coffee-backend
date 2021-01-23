const express = require('express')
const router = express.Router()

const { updateCustomerByCsId } = require('../src/controllers/CustomerController')

const uploadImage = require('../src/middleware/multer')

router.put('/:csId', uploadImage, updateCustomerByCsId)

module.exports = router
