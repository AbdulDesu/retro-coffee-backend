const express = require('express')
const router = express.Router()

const {
  addProduct,
  getAllProduct,
  getProductById,
  getProductByCategory,
  getProductByHigherPrice,
  getProductByLowerPrice,
  updateProduct,
  deleteProduct
} = require('../src/controllers/ProductController')

const uploadImage = require('../src/middleware/multer')
const { authorization } = require('../src/middleware/auth')

router.get('/', authorization, getAllProduct)
router.get('/:prId', authorization, getProductById)
router.get('/filter/category', authorization, getProductByCategory)
router.get('/filter/higher', authorization, getProductByHigherPrice)
router.get('/filter/lower', authorization, getProductByLowerPrice)
router.post('/', authorization, uploadImage, addProduct)
router.put('/:prId', authorization, uploadImage, updateProduct)
router.delete('/:prId', authorization, deleteProduct)

module.exports = router
