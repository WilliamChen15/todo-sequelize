const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

// routes/modules/users.js
// 加入 middleware，驗證 request 登入狀態
router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.send('register')
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router