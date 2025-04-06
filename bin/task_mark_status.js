#!/usr/bin/env node

import fs from "fs";
import { TaskStatus, parseJsonToTasks } from "../task_model.js";

const filePath = "task.json";

const availableStatus = Object.values(TaskStatus).filter((status) => status != TaskStatus.TODO)

const markTask = (id, status) => {
  if (isNaN(id)) {
    console.error("id needs to be number");
    process.exit(1);
  }

  if (!status) {
    console.error("provide with status update");
    process.exit(1);
  } else {
    if (!availableStatus.includes(status)) {
      console.error(
        `Invalid status, available options are ${availableStatus.join(", ")}`
      );
      process.exit(1);
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.error("No task file initialized yet. Add a task first");
          process.exit(1);
        } else if (err.code === "EACCES") {
          console.error(`Permission denied for file ${filePath}`);
          process.exit(1);
        } else {
          throw err;
        }
      } else {
        const tasks = parseJsonToTasks(data);
        const [targetTask] = tasks.filter((task) => task.id == id);
        if (!targetTask) {
          console.error("No task found");
          process.exit(1);
        }
        const index = tasks.indexOf(targetTask);
        targetTask.update(undefined, status);
        tasks[index] = targetTask;
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        console.log(
          `Task ${targetTask.id} status updated to ${targetTask.status}`
        );
      }
    });
  }
};

const [id, status] = process.argv.slice(2);
markTask(id, status);
