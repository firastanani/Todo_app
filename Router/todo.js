const express = require('express')
const Todo = require('../model/todo')
const User = require("../model/User.js");
const auth = require('../middleware/auth')
const router = new express.Router()


// Add new todo.for specific user
router.post('/api/addTodo/:idUser',auth ,  async (req, res) => {
    let user = await User.findOne({_id : req.params.idUser})
    if(!user){
        return res.status(404).send()
    }
    const newTodo = new Todo({
        ...req.body,
        owner: user._id
    })

    try {
        await newTodo.save()
        res.status(201).send(newTodo)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Update an existing todo for specific user.
router.patch('/api/updateTodo/:idTodo/:idUser',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try {
        const updateTodo = await Todo.findOne({ _id: req.params.idTodo, owner:req.params.idUser})

        if (!updateTodo) {
            return res.status(404).send()
        }

        updates.forEach((update) => updateTodo[update] = req.body[update])
        await updateTodo.save()
        res.send(updateTodo)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Delete an existing todo for specific user.
router.delete('/api/deleteTodo/:idTodo/:idUser',auth , async (req, res) => {
    try {
        let deleteTodo = await Todo.findOne({ _id: req.params.idTodo, owner:req.params.idUser })

        if (!deleteTodo) {
            res.status(404).send()
        }
        deleteTodo = await deleteTodo.remove()
        res.send(deleteTodo)
    } catch (e) {
        res.status(500).send()
    }
})

// Get todo information for specific user
router.get('/api/getTodo/:idTodo/:idUser',auth ,async (req, res) => {
    try {
        const getTodo = await Todo.findOne({ _id: req.params.idTodo, owner: req.params.idUser })

        if (!getTodo) {
            res.status(404).send()
        }
        res.send(getTodo)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get all todo for specific user
router.get('/api/getAllTodo/:idUser',auth, async (req, res) => {
    try {
          let user = await User.findOne({ _id: req.params.idUser }).populate('Todolist');
        res.send(user.Todolist)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router