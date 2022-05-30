const router = require('express').Router()
const {Tasks} = require('../models')

router.get('/', async (req, res) => {
  return res.send({message: 'Server Response ok/200'})
})

router.get("/getTask", async (req, res) => {
  try {
      const task = await Tasks.find({})
      return res.send(task)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
})
  
router.post("/addTask", async (req, res) => {
  console.log(req.body)
  try {
    const task = await Tasks.create(req.body)
    return task
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/completeTask/:id", async (req, res, next) => {
  console.log(req.body)
  try {
    const task = await Tasks.findOneAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          completed: req.body.completedTask
        }
      },
    )
    return res.send(task)
  } catch (error) {
    next({status: 400, message: "Failed to change tasks"})
  }
})

router.put("/updateTask/:id", async (req, res, next) => {
  try {
    const task = await Tasks.findOneAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          tasks: req.body.changeTask,
        }
      },
      {
      new: true
    })
    return res.send(task)
  } catch (error) {
    next({status: 400, message: "failed to update todo" });
  }
})

router.delete("/deleteTask/:id", async (req, res, next) => {
  try {
    await Tasks.findByIdAndRemove(req.params.id)
    return res.send("Task deleted")
  } catch (error) {
    next({ status: 400, message: "failed to delete todo" });
  }
});
  

module.exports = router