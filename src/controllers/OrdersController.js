const {
  createOrders,
  updateOrdersStatus,
  getAllOrder,
  getTransaction,
  getTransactionById
} = require('../models/OrdersModel')

const {
  statusGet,
  statusCreate,
  statusCreateOrder,
  statusCreateFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  getAllOrder: async (_req, res, _next) => {
    try {
      const result = await getAllOrder()

      console.error('testing')
      if (result.length) {
        statusGet(res, result)
      } else {
        console.error('testing')
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  createOrders: async (req, res, _next) => {
    try {
      const result = await createOrders(req.body)

      if (result.affectedRows) {
        const findData = await getTransactionById(req.body.cs_id, result.insertId)

        if (findData.length) {
          statusCreateOrder(res, findData)
        } else {
          statusNotFound(res)
        }
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },

  getAllTransaction: async (req, res, _next) => {
    const { csId } = req.params

    try {
      const result = await getTransaction(csId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  getAllTransactionById: async (req, res, _next) => {
    const { csId, orId } = req.query

    try {
      const result = await getTransactionById(csId, orId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  updateOrdersStatus: async (req, res, _next) => {
    const { csId, orId } = req.query

    try {
      const result = await updateOrdersStatus(csId, orId, req.body)

      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  }
}
