const express = require("express");
const router = express.Router();
const userdata = require("./model/Schema"); 

router.use(express.json());

// POST  add a task
router.post("/", async (req, res) => {
  try {
    const newTask = new userdata({
      task: req.body.task,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// GET route to retrieve all tasks
router.get("/", async (req, res) => {
  try {
    const userData = await userdata.find();

    if (!userData) {
      res.status(404).json({ success: false, message: "No tasks found" });
    } else {
      console.log(userData);
      res.status(200).json(userData);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//delete todo

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await userdata.findByIdAndDelete(id);
  res.json({ message: "Task deleted successfully" });
});

//edit
router.put("/:_id", (req, res) => {

  const userId = req.params._id;
  console.log(userId);
  const updatedData = req.body;
  console.log(updatedData, "hjjjjjjjjjjjjjjjjjj");

  userdata
    .findByIdAndUpdate(userId, updatedData, { new: true })
    .then((data) => {
      if (data) {
        res.send(`Updated user: ${data._id}`);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error updating user");
    });
});
module.exports = router;
