const {
  createOrders,
  updateOrdersStatus,
  getTransaction
} = require('../models/OrdersModel')

const {
  statusGet,
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  createOrders: async (req, res, _next) => {
    try {
      const result = await createOrders(req.body)

      if (result.affectedRows) {
        statusCreate(res)
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
