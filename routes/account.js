const express = require('express')
const router = express.Router()

const { createAccount, loginAccount, updateAccount, updateAccountPass, getEmail } = require('../src/controllers/AccountController')
const { hashPassword } = require('../src/middleware/auth')

router.post('/register', hashPassword, createAccount)
router.post('/login', loginAccount)
router.put('/:acId', updateAccount)
router.post('/email', getEmail)
router.put('/password/:acId', hashPassword, updateAccountPass)
module.exports = router
