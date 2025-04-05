#!/usr/bin/env node

import { TaskStatus } from "../task_model.js";
import fs from "fs";

let availableStatus = Object.values(TaskStatus).map((status) => status.name);

const readTasks = (status = undefined) => {
  const data = fs.readFileSync("task.json");
  const tasks = JSON.parse(data);
  if (status) {
    if (!availableStatus.includes(status)) {
      console.error(
        `Invalid status, available options are ${availableStatus.join(", ")}`
      );
      return;
    }
    const dataByStatus = tasks.filter((obj) => obj.status == status);
    console.log(dataByStatus);
  } else {
    console.log(tasks);
  }
};

const args = process.argv.slice(2);
readTasks(args[0]);
