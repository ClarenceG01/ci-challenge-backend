import user from "../models/user.js";
import task from "../models/task.js";
export async function addTask(req, res) {
  const { title, status, userId, deadline } = req.body;
  try {
	const foundUser = await user.findById(userId);
    const newTask = new task({
      title,
      status,
      userId,
	  username: foundUser.username,
      deadline,
    });
    await newTask.save();
    res.status(200).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
export async function getTasks(req, res) {
  try {
    const tasks = await task.find();
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
