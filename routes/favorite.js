const express = require('express')
const router = express.Router()

const { createFavorite, getAllFavoriteByCsId, checkIsFavorite, deleteFavoriteByFaId } = require('../src/controllers/FavoriteController')

router.post('/', createFavorite)
router.get('/check', checkIsFavorite)
router.get('/:csId', getAllFavoriteByCsId)
router.delete('/:faId', deleteFavoriteByFaId)

module.exports = router
