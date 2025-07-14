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
export async function getUserTasks(req, res) {
  const { username } = req.params;
  try {
	const tasks = await task.find({ username });
	console.log(`Tasks for user ${username}:`, tasks);
	if (tasks.length === 0) {
	  return res.status(404).json({ message: "No tasks found for this user" });
	}
	res.status(200).json({
	  tasks,
	});
  } catch (error) {
	console.log(error);
	res.status(500).json({ message: "Server error", error: error.message });
  }
}
export async function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
	const updatedTask = await task.findByIdAndUpdate(
	  id,
	  { status },
	  { new: true }
	);
	if (!updatedTask) {
	  return res.status(404).json({ message: "Task not found" });
	}
	res.status(200).json({
	  message: "Task status updated successfully",
	  task: updatedTask,
	});
  } catch (error) {
	console.log(error);
	res.status(500).json({ message: "Server error", error: error.message });
  }
}