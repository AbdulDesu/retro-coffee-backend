const express = require('express')
const router = express.Router()

const {
  createFavorite,
  getAllFavoriteByCsId,
  checkIsFavorite,
  deleteFavoriteByFaId,
  deleteFavoriteByProduct
} = require('../src/controllers/FavoriteController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createFavorite)
router.get('/check', authorization, checkIsFavorite)
router.get('/:csId', authorization, getAllFavoriteByCsId)
router.delete('/:faId', authorization, deleteFavoriteByFaId)
router.delete('/', authorization, deleteFavoriteByProduct)

module.exports = router
