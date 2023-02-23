const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User


router.get('/login', (_req, res) => {
  res.render('login')
})

// routes/modules/users.js
// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/users/login',
    badRequestMessage: '信箱及密碼皆不得為空', // missing credentials
    failureFlash: true,
  }
))

router.get('/register', (_req, res) => {
  const register = true
  res.render('register', { register })
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router