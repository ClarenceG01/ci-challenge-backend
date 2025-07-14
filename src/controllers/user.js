import user from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export async function Register(req, res) {
  try {
    const { username, password, email, role } = req.body;
    // check if user exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already used",
      });
    }
    // create hashed pwd
    const hashedPwd = await bcrypt.hash(password, 10);

    // send email logic
    const newUser = new user({
      username,
      email,
      password: hashedPwd,
      role,
    });
    await newUser.save();
    res.status(200).json({ message: "registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}
export async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const foundUser = await user.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Incorrect password" });
    }
    const userData = {
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    };
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login success", user: userData });
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
}
export async function getUsers(req, res) {
  try {
    const users = await user
      .find({ role: "user" })
      .select("-password -__v -role");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const foundUser = await user.findOne({ _id: id });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedData = {
      username: username || foundUser.username,
      email: email || foundUser.email,
      password: password ? await bcrypt.hash(password, 10) : foundUser.password,
    };
    await user.updateOne({ _id: id }, { $set: updatedData });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
export async function deleteUser(req, res) {
  const { id } = req.params;
  console.log(`Deleting user with ID: ${id}`);
  try {
	const foundUser = await user.findOne({ _id: id });
	if (!foundUser) {
	  return res.status(404).json({ message: "User not found" });
	}
	await user.deleteOne({ _id: id });
	res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
	return res.status(500).json({ message: "Server error" });
  }
}
