const express = require('express')
const router = express.Router()

const {
  createOrders,
  updateOrdersStatus,
  getAllOrder,
  getAllTransaction,
  getAllTransactionById
} = require('../src/controllers/OrdersController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createOrders)
router.put('/', authorization, updateOrdersStatus)
router.get('/:csId', authorization, getAllTransaction)
router.get('/', authorization, getAllTransactionById)
router.get('/all/', authorization, getAllOrder)

module.exports = router
