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
  updateProductWithImage,
  deleteProduct
} = require('../src/controllers/ProductController')

const uploadImage = require('../src/middleware/multer')

router.get('/', getAllProduct)
router.get('/:pr_id', getProductById)
router.get('/filter/category', getProductByCategory)
router.get('/filter/higher', getProductByHigherPrice)
router.get('/filter/lower', getProductByLowerPrice)
router.post('/add/', uploadImage, addProduct)
router.put('/update/:pr_id', updateProduct)
router.put('/update/image/:pr_id', uploadImage, updateProductWithImage)
router.delete('/delete/:pr_id', deleteProduct)

module.exports = router
