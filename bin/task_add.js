#!/usr/bin/env node

import { parseJsonToTasks, Task } from "../task_model.js";
import fs from "fs";

export function addTask(desc) {
  if (!desc || desc.length == 0 ) {
    console.error("Can't add a new task with empty description");
    process.exit(1);
  }
  const filePath = "task.json";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        const task = new Task(1, desc);
        const taskList = [task];
        const data = JSON.stringify(taskList, null, 2);
        fs.writeFileSync("task.json", data);
        console.log(
          `Task file created and task added succesfully (ID: ${task.id})`
        );
      } else if (err.code === "EACCES") {
        console.error(`Permission denied for file ${filePath}`);
      } else {
        throw err;
      }
    } else {
      const tasks = parseJsonToTasks(data);
      const newTask = new Task(tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1, desc);
      tasks.push(newTask);
      const newData = JSON.stringify(tasks, null, 2);
      fs.writeFileSync(filePath, newData);
      console.log(`Task added successfully (ID: ${newTask.id})`);
    }
  });
};
