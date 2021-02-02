const express = require('express')
const router = express.Router()

const {
  createOrders,
  updateOrdersStatus,
  getAllTransaction,
  getAllTransactionById
} = require('../src/controllers/OrdersController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createOrders)
router.put('/', authorization, updateOrdersStatus)
router.get('/:csId', authorization, getAllTransaction)
router.get('/', authorization, getAllTransactionById)

module.exports = router
