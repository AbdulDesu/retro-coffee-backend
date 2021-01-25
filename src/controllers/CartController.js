const { createCart, getAllCartByCsId, getCartByCrId, deleteCartByCrId, updateCartByCrId } = require('../models/CartModel')

const {
  statusGet,
  statusCreate,
  statusCreateFail,
  statusUpdate,
  statusUpdateFail,
  statusDelete,
  statusDeleteFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  createCart: async (req, res, _next) => {
    try {
      const result = await createCart(req.body)
      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      console.error(err)
      statusServerError(res)
    }
  },

  getAllCartByCsId: async (req, res, _next) => {
    const { csId } = req.params

    try {
      const result = await getAllCartByCsId(csId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  deleteCartByCrId: async (req, res, _next) => {
    try {
      const { crId } = req.params
      const findData = await getCartByCrId(crId)

      if (findData.length) {
        const result = await deleteCartByCrId(crId)

        if (result.affectedRows) {
          statusDelete(res)
        } else {
          statusDeleteFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },

  updateCartByCrId: async (req, res, _next) => {
    const { crId } = req.params

    try {
      const findData = await getCartByCrId(crId)

      if (findData.length) {
        const result = await updateCartByCrId(crId, req.body)

        if (result.affectedRows) {
          statusUpdate(res)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  }
}
