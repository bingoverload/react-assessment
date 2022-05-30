const router = require('express').Router()
const {To_Do} = require('../models/to-doSchema')

router.get('/', async (req, res, next) => {
    return res.send({message: 'Server Response ok/200'})
})

router.get("/getTask", async (req, res, next) => {
    try {
      const todos = await To_Do.find({})
      return success(res, todos)
    } catch (err) {
      next({ status: 400, message: "Failed to fetch task" })
    }
})
  
router.post("/addTask", async (req, res, next) => {
    try {
      const todo = await To_Do.create(req.body)
      return success(res, todo)
    } catch (err) {
      next({ status: 400, message: "Failed to add new task" })
    }
})
  
router.put("/updateTask/:id", async (req, res, next) => {
    try {
      const todo = await To_Do.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      return success(res, todo)
    } catch (err) {
      next({ status: 400, message: "Failed to update task" })
    }
})

router.delete("/deleteTask/:id", async (req, res, next) => {
    try {
      await To_Do.findByIdAndRemove(req.params.id)
      return success(res, "Task deleted")
    } catch (err) {
      next({ status: 400, message: "Failed to delete task" })
    }
  })
  
router.use((err, req, res, next) => {
    return res.status(err.status || 400).json({
      status: err.status || 400,
      message: err.message || "Error",
    })
})

module.exports = router