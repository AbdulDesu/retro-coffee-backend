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
  addCategory: async (req, res, _next) => {
    req.body.ct_pic_image = req.file === undefined ? '' : req.file.filename

    const data = {
      ...req.body,
      ct_pic_image: req.body.ct_pic_image
    }

    delete data.ct_pic_image

    try {
      const result = await addCategoryModel(req.body)

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

  getAllCategory: async (req, res, _next) => {
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
    const { ct_id } = req.params

    try {
      const result = await getCategoryByIDModel(ct_id)
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

  updateCategory: async (req, res, _next) => {
    const { ct_id } = req.params

    try {
      const caughtData = await getCategoryByIDModel(ct_id)

      if (caughtData.length) {
        const result = await updateCategoryModel(ct_id, req.body)

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

  updateCategoryWithImage: async (req, res, _next) => {
    const { ct_id } = req.params

    req.body.ct_pic_image = req.file === undefined ? '' : req.file.filename

    const data = {
      ...req.body,
      ct_pic_image: req.body.ct_pic_image
    }

    delete data.ct_pic_image

    try {
      const caughtData = await getCategoryByIDModel(ct_id)

      if (caughtData.length) {
        const result = await updateCategoryModel(ct_id, req.body)

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
    const { ct_id } = req.params

    try {
      const caughtData = await getCategoryByIDModel(ct_id)

      if (caughtData.length) {
        const result = await deleteCategoryModel(ct_id)

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
