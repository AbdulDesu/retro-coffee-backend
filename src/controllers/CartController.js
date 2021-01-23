const { createCart, getCartByCsId, deleteCartByCsId, updateCartByCsId } = require('../models/CartModel')

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
    req.body.image = req.file === undefined ? '' : req.file.filename
    const data = {
      ...req.body,
      cr_pic_image: req.body.image
    }
    delete data.image

    try {
      const result = await createCart(data)
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
      const result = await getCartByCsId(csId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  deleteCartByCsId: async (req, res, _next) => {
    try {
      const { csId } = req.params
      const findData = await getCartByCsId(csId)

      if (findData.length) {
        const result = await deleteCartByCsId(csId)

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
  updateCartByCsId: async (req, res, _next) => {
    const { csId } = req.params

    try {
      const findData = await getCartByCsId(csId)

      if (findData.length) {
        req.body.image = req.file === undefined ? findData[0].cr_pic_image : req.file.filename

        const data = {
          ...req.body,
          cr_pic_image: req.body.image
        }
        console.log(data)
        console.log(csId)

        delete data.image

        const result = await updateCartByCsId(csId, data)

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
