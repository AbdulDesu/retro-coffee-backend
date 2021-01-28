const express = require('express')
const router = express.Router()

const { createHistory, getAllHisByCsId } = require('../src/controllers/HistoryController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createHistory)
router.get('/:csId', authorization, getAllHisByCsId)

module.exports = router
