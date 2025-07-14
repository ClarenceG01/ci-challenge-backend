import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { userRoute } from "./src/routes/user.js";

const app = express();
const port = process.env.PORT || 3000;
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", userRoute);
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
