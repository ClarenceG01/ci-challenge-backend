import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { userRoute } from "./src/routes/user.js";
import { taskRoute } from "./src/routes/task.js";

const app = express();
const port = process.env.PORT || 3000;
// middlewares
app.use(
  cors({
    origin: "https://ci-challenge.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", userRoute);
app.use("/tasks", taskRoute);
async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToDatabase();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
