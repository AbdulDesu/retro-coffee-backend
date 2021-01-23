const express = require('express')
const router = express.Router()

const { createHistory, getAllHisByCsId } = require('../src/controllers/HistoryController')

router.post('/', createHistory)
router.get('/:csId', getAllHisByCsId)

module.exports = router
