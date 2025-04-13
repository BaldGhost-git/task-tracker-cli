#!/usr/bin/env node

import fs from "fs";
import { parseJsonToTasks } from "../task_model.js";

const filePath = "task.json";

export function deleteTask(id) {
  if (isNaN(id)) {
    console.error("id needs to be number");
    process.exit(1);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error(
          "No task file initialized yet. Add a task first"
        );
        process.exit(1);
      } else if (err.code === "EACCES") {
        console.error(`Permission denied for file ${filePath}`);
        process.exit(1);
      } else {
        throw err;
      }
    } else {
      const tasks = parseJsonToTasks(data);
      if (tasks.length == 0) {
        console.error("You have no tasks");
        process.exit(1);
      }
      const newTask = tasks.filter((task) => task.id != id);
      fs.writeFileSync(filePath, JSON.stringify(newTask, null, 2));
      console.log(`Task deleted successfully`);
    }
  });
};
