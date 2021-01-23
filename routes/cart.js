const express = require('express')
const router = express.Router()

const { createCart, getAllCartByCsId, deleteCartByCsId, updateCartByCsId } = require('../src/controllers/CartController')

const uploadImage = require('../src/middleware/multer')
const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, uploadImage, createCart)
router.get('/:csId', authorization, getAllCartByCsId)
router.delete('/:csId', authorization, deleteCartByCsId)
router.put('/:csId', authorization, uploadImage, updateCartByCsId)

module.exports = router
