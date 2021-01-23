const express = require('express')
const router = express.Router()

const { createFavorite, getAllFavoriteByCsId, deleteFavoriteByFaId } = require('../src/controllers/FavoriteController')

router.post('/', createFavorite)
router.get('/:csId', getAllFavoriteByCsId)
router.delete('/:faId', deleteFavoriteByFaId)

module.exports = router
