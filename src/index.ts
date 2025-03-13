import { connectToDatabase } from "./db-connection";
import express from "express";
import { taskRouter } from "./routes/task.router";
const app = express();

app.use(express.json());

app.use("/tasks", taskRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

connectToDatabase();