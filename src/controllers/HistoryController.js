const { createHis, getHisByCsId, getHisByOrId } = require('../models/HistoryModel')

const {
  statusGet,
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  createHistory: async (req, res, _next) => {
    try {
      console.log(req.body)
      const result = await createHis(req.body)
      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      statusServerError(res)
    }
  },
  getAllHisByCsId: async (req, res, _next) => {
    const { csId } = req.params

    try {
      const result = await getHisByCsId(csId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },
  getAllHisByOrId: async (req, res, _next) => {
    const { orId } = req.params

    try {
      const result = await getHisByOrId(orId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  }
}
