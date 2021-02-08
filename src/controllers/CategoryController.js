const {
  addCategoryModel,
  getAllCategoryModel,
  getCategoryByIDModel,
  updateCategoryModel,
  deleteCategoryModel
} = require('../models/CategoryModel')

const {
  statusGet,
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusNotFound,
  statusUpdate,
  statusDelete
} = require('../helpers/status')

module.exports = {
  getAllCategory: async (_req, res, _next) => {
    try {
      const result = await getAllCategoryModel()

      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  getCategoryById: async (req, res, _next) => {
    const { ctId } = req.params

    try {
      const result = await getCategoryByIDModel(ctId)
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  addCategory: async (req, res, _next) => {
    req.body.image = req.file === undefined ? '' : req.file.filename
    const data = {
      ...req.body,
      ct_pic_image: req.body.image
    }
    delete data.image

    try {
      const result = await addCategoryModel(data)

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

  updateCategory: async (req, res, _next) => {
    const { ctId } = req.params

    try {
      const caughtData = await getCategoryByIDModel(ctId)

      if (caughtData.length) {
        req.body.image = req.file === undefined ? caughtData[0].ct_pic_image : req.file.filename

        const data = {
          ...req.body,
          ct_pic_image: req.body.image
        }

        delete data.image

        const result = await updateCategoryModel(ctId, data)

        if (result.affectedRows) {
          statusUpdate(res, result)
        } else {
          statusNotFound(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  },

  deleteCategory: async (req, res, _next) => {
    const { ctId } = req.params

    try {
      const caughtData = await getCategoryByIDModel(ctId)

      if (caughtData.length) {
        const result = await deleteCategoryModel(ctId)

        if (result.affectedRows) {
          statusDelete(res, result)
        } else {
          statusNotFound(res)
        }
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.error(error)
      statusServerError(res)
    }
  }
}
