const express = require('express')
const router = express.Router()

const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../src/controllers/CategoryController')

const uploadImage = require('../src/middleware/multer')
const { authorization } = require('../src/middleware/auth')

router.get('/', authorization, getAllCategory)
router.get('/:ctId', authorization, getCategoryById)
router.post('/', authorization, uploadImage, addCategory)
router.put('/:ctId', authorization, updateCategory)
router.delete('/:ctId', authorization, deleteCategory)

module.exports = router
