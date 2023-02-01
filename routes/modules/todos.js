const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (_req, res) => {
  return res.render('new')
})

// userId(X)  UserId(O) 
router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 每個todo的id(主鍵)不重複，似乎不需要額外加上userId(外鍵)的查詢?
router.get('/:id', (req, res) => {
  // const userId = req.user.id
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findByPk(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on' // if ( isDone === 'on' ) {  todo.isDone = true  } else {  todo.isDone = false  }
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => todo.destroy()) // sequelize的刪除不是remove
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router