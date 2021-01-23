const { updateCustomerModel, getCustomerByCsIdModel } = require('../models/CustomerModel')

const {
  statusUpdate,
  statusUpdateFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  updateCustomerByCsId: async (req, res, _next) => {
    const { csId } = req.params

    try {
      const findData = await getCustomerByCsIdModel(csId)

      if (findData.length) {
        req.body.image = req.file === undefined ? findData[0].cs_pic_image : req.file.filename

        const data = {
          ...req.body,
          cs_pic_image: req.body.image
        }

        delete data.image
        console.log(req.body.image)
        console.log(data)
        console.log(csId)

        const result = await updateCustomerModel(csId, data)

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
