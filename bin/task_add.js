#!/usr/bin/env node

import { Task } from "../task_model.js";
import fs from "fs";

const addTask = (desc) => {
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
      const tasks = JSON.parse(data);
      const newTask = new Task(tasks[tasks.length - 1].id + 1, desc);
      tasks.push(newTask);
      const newData = JSON.stringify(tasks, null, 2);
      fs.writeFileSync(filePath, newData);
      console.log(`Task added successfully (ID: ${newTask.id})`);
    }
  });
};

const args = process.argv.slice(2);
addTask(args[0]);
