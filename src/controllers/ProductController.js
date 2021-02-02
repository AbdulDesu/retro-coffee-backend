const isEmpty = require('lodash.isempty')

const {
  addProductModel,
  getAllData,
  getAllProductModel,
  getAllProductPromoModel,
  getAllProductByIdCategoryModel,
  getSearchProductModel,
  getProductByIDModel,
  searchProductModel,
  getProductByCategoryNameModel,
  getProductByHigherModel,
  getProductByLowerModel,
  updateProductModel,
  deleteProductModel
} = require('../models/ProductModel')

const {
  statusGet,
  statusGetPaginate,
  statusCreate,
  statusCreateFail,
  statusServerError,
  statusNotFound,
  statusUpdate,
  statusDelete
} = require('../helpers/status')

module.exports = {
  getAllProduct: async (req, res) => {
    let { search, limit, page } = req.query

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const paginate = {
      search: search,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      let result

      if (isEmpty(search)) {
        result = await getAllProductModel(paginate)
      } else {
        result = await getSearchProductModel(paginate)
      }

      if (result.length) {
        const totalData = await getAllData()
        const totalPage = Math.ceil(totalData.length / limit)

        statusGetPaginate(res, result, totalPage)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.log(error)
      statusServerError(res)
    }
  },

  getAllProductPromo: async (req, res) => {
    let { search, limit, page } = req.query

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const paginate = {
      search: search,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      let result

      if (isEmpty(search)) {
        result = await getAllProductPromoModel(paginate)
      } else {
        result = await getSearchProductModel(paginate)
      }

      if (result.length) {
        const totalData = await getAllData()
        const totalPage = Math.ceil(totalData.length / limit)

        statusGetPaginate(res, result, totalPage)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      statusServerError(res)
    }
  },

  getAllProductByIdCategory: async (req, res) => {
    const { ctId } = req.params
    let { search, limit, page } = req.query

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const paginate = {
      ctId: ctId,
      search: search,
      limit: limit,
      offset: (page - 1) * limit
    }

    try {
      let result

      if (isEmpty(search)) {
        result = await getAllProductByIdCategoryModel(paginate)
      } else {
        result = await getSearchProductModel(paginate)
      }

      if (result.length) {
        const totalData = await getAllData()
        const totalPage = Math.ceil(totalData.length / limit)

        statusGetPaginate(res, result, totalPage)
      } else {
        statusNotFound(res)
      }
    } catch (error) {
      console.log(error)
      statusServerError(res)
    }
  },

  addProduct: async (req, res, _next) => {
    req.body.image = req.file === undefined ? '' : req.file.filename

    const data = {
      ...req.body,
      pr_pic_image: req.body.image
    }

    delete data.image

    try {
      const result = await addProductModel(data)

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

  getProductById: async (req, res, _next) => {
    const { prId } = req.params

    try {
      const result = await getProductByIDModel(prId)
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

  searchProduct: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'pr_name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 50
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    searchProductModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    })
  },

  getProductByCategory: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'ct_name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getProductByCategoryNameModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    })
  },

  getProductByHigherPrice: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'pr_name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getProductByHigherModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    })
  },

  getProductByLowerPrice: (req, res) => {
    let { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'pr_name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 25
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getProductByLowerModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        statusGet(res, result)
      } else {
        statusNotFound(res)
      }
    })
  },

  updateProduct: async (req, res, _next) => {
    const { prId } = req.params

    try {
      const caughtData = await getProductByIDModel(prId)

      if (caughtData.length) {
        req.body.image = req.file === undefined ? caughtData[0].pr_pic_image : req.file.filename
        const data = {
          ...req.body,
          pr_pic_image: req.body.image
        }
        delete data.image

        const result = await updateProductModel(prId, data)

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

  deleteProduct: async (req, res, _next) => {
    const { prId } = req.params

    try {
      const caughtData = await getProductByIDModel(prId)

      if (caughtData.length) {
        const result = await deleteProductModel(prId)

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
