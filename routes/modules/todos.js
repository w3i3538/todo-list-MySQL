// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo 
const db = require('../../models')
const Todo = db.Todo

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user.id
    const name = req.body.name

    return Todo.create({ name, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const userId = req.user.id
    const id = req.params.id

    return Todo.findOne({ where: { id, userId } })
        .then(todo => res.render('detail', { todo: todo.toJSON() }))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const userId = req.user.id
    const id = req.params.id

    return Todo.findOne({ id, userId })
        .then(todo => res.render('edit', { todo: todo.get() }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    const { name, isDone } = req.body

    return Todo.findOne({ where: { id, userId } })
        .then(todo => {
            todo.name = name
            todo.isDone = isDone === 'on'
            return todo.save()
        })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const userId = req.user.id
    const id = req.params.id

    return Todo.findOne({ where: { id, userId } })
        .then(todo => todo.destroy())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


//匯出路由模組
module.exports = router