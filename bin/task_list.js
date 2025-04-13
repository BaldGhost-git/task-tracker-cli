#!/usr/bin/env node

import { TaskStatus } from "../task_model.js";
import fs from "fs";

let availableStatus = Object.values(TaskStatus);
const filePath = "task.json";

export function readTasks(status = undefined) {
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
      const tasks = JSON.parse(data);
      if (status) {
        if (!availableStatus.includes(status)) {
          console.error(
            `Invalid status, available options are ${availableStatus.join(
              ", "
            )}`
          );
          return;
        }
        const dataByStatus = tasks.filter((obj) => obj.status == status);
        console.log(dataByStatus);
      } else {
        console.log(tasks);
      }
    }
  });
}
