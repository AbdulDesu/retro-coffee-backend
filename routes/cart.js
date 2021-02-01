const express = require('express')
const router = express.Router()

const { createCart, getAllCartByCsId, deleteCartByCrId, updateCartByCrId } = require('../src/controllers/CartController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createCart)
router.get('/:csId', authorization, getAllCartByCsId)
router.delete('/:crId', authorization, deleteCartByCrId)
router.put('/:crId', authorization, updateCartByCrId)

module.exports = router
