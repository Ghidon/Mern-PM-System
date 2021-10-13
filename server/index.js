import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import taskRoutes from "./routes/tasks.js";
import subTaskRoutes from "./routes/subTasks.js";
import projectsRoutes from "./routes/projects.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/subTasks", subTaskRoutes);
app.use("/projects", projectsRoutes);

const CONNECTION_URL =
  "mongodb+srv://ghidon:uMcjhucJdFaeuqID@cluster0.rnrjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
