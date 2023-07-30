// 引用express和express router
const express = require('express')
const router = express.Router()
// 引入模組
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// 將網址結構符合 / 字串的 request 導向 各模組 
router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

//匯出路由模組
module.exports = router