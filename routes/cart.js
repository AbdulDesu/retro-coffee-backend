const express = require('express')
const router = express.Router()

const { createCart, getAllCartByCsId, deleteCartByCrId, updateCartByCrId } = require('../src/controllers/CartController')

const uploadImage = require('../src/middleware/multer')
const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, uploadImage, createCart)
router.get('/:csId', authorization, getAllCartByCsId)
router.delete('/:crId', authorization, deleteCartByCrId)
router.put('/:crId', authorization, uploadImage, updateCartByCrId)

module.exports = router
