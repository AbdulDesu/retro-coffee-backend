const express = require('express')
const router = express.Router()

const { createHistory, getAllHisByCsId, getAllHisByOrId } = require('../src/controllers/HistoryController')

const { authorization } = require('../src/middleware/auth')

router.post('/', authorization, createHistory)
router.get('/:csId', authorization, getAllHisByCsId)
router.get('/detail/:orId', authorization, getAllHisByOrId)
module.exports = router
