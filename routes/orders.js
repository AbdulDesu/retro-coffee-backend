const express = require('express')
const router = express.Router()

const {
  createOrders,
  updateOrdersStatus,
  getAllTransactionCustomer,
  getAllTransaction,
  getAllTransactionById
} = require('../src/controllers/OrdersController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createOrders)
router.put('/', authorization, updateOrdersStatus)
router.get('/:csId', authorization, getAllTransaction)
router.get('/', authorization, getAllTransactionById)
router.get('/customer', authorization, getAllTransactionCustomer)

module.exports = router
