const express = require('express')
const router = express.Router()

const {
  createOrders,
  getAllTransaction
} = require('../src/controllers/OrdersController')

router.post('/', createOrders)
router.get('/:csId', getAllTransaction)

module.exports = router
