const { createFavorite, getFavoriteByCsId, deleteFavoriteByFaId, getFavoriteByFaId } = require('../models/FavoriteModel')

const {
  statusGet,
  statusCreate,
  statusCreateFail,
  statusDelete,
  statusDeleteFail,
  statusServerError,
  statusNotFound
} = require('../helpers/status')

module.exports = {
  createFavorite: async (req, res, _next) => {
    try {
      const result = await createFavorite(req.body)

      if (result.affectedRows) {
        statusCreate(res)
      } else {
        statusCreateFail(res)
      }
    } catch (err) {
      console.log(err)
      statusServerError(res)
    }
  },

  getAllFavoriteByCsId: async (req, res, _next) => {
    const { csId } = req.params

    try {
      const result = await getFavoriteByCsId(csId)

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  deleteFavoriteByFaId: async (req, res, _next) => {
    try {
      const { faId } = req.params
      const findData = await getFavoriteByFaId(faId)

      if (findData.length) {
        const result = await deleteFavoriteByFaId(faId)

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
  }
}
