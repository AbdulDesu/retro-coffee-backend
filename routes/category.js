const express = require('express')
const router = express.Router()

const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  updateCategoryWithImage,
  deleteCategory
} = require('../src/controllers/CategoryController')

const uploadCategoryPic = require('../src/middleware/multer_category')

router.get('/', getAllCategory)
router.get('/:ct_id', getCategoryById)
router.post('/add/', uploadCategoryPic, addCategory)
router.put('/update/:ct_id', updateCategory)
router.put('/update/image/:ct_id', uploadCategoryPic, updateCategoryWithImage)
router.delete('/delete/:ct_id', deleteCategory)

module.exports = router
