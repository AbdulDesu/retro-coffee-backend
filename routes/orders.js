const express = require('express')
const router = express.Router()

const {
  createOrders,
  updateOrdersStatus,
  getAllTransaction
} = require('../src/controllers/OrdersController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createOrders)
router.put('/', authorization, updateOrdersStatus)
router.get('/:csId', authorization, getAllTransaction)

module.exports = router
