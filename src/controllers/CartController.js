const {
  createCart,
  getAllCartByCsId,
  getCartByCrId,
  getCartByNameId,
  deleteCartByCrId,
  updateCartByCrId
} = require('../models/CartModel')

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
      const findData = await getCartByNameId(req.body.cs_id, req.body.cr_product)

      if (findData.length) {
        const qty = Number(req.body.cr_qty) + Number(1)

        const data = {
          cr_qty: qty,
          cr_total: findData[0].cr_price * req.body.cr_qty
        }

        const result = await updateCartByCrId(findData[0].cr_id, data)

        if (result.affectedRows) {
          statusUpdate(res)
        } else {
          statusUpdateFail(res)
        }
      } else {
        const result = await createCart(req.body)

        if (result.affectedRows) {
          statusCreate(res)
        } else {
          statusCreateFail(res)
        }
      }
    } catch (err) {
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

      const data = {
        cr_qty: req.body.cr_qty,
        cr_total: findData[0].cr_price * req.body.cr_qty
      }

      if (findData.length) {
        const result = await updateCartByCrId(crId, data)

        if (result.affectedRows) {
          statusUpdate(res)
        } else {
          statusUpdateFail(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (err) {
      console.log(err)
      statusServerError(res)
    }
  }
}
