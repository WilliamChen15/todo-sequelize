// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// 定義首頁路由
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) }) // 報錯這部分啥意思
})

// 匯出路由模組
module.exports = router