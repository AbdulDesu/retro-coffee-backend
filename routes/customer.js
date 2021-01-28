const express = require('express')
const router = express.Router()

const { updateCustomerByCsId, getCustomerByCsId } = require('../src/controllers/CustomerController')

const uploadImage = require('../src/middleware/multer')
const { authorization } = require('../src/middleware/auth')

router.put('/:csId', authorization, uploadImage, updateCustomerByCsId)
router.get('/:csId', authorization, getCustomerByCsId)

module.exports = router
