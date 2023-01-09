import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from "./routes/tasks.js";
import subTaskRoutes from "./routes/subTasks.js";
import projectsRoutes from "./routes/projects.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/subtasks", subTaskRoutes);
app.use("/projects", projectsRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to PM system API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
