#!/usr/bin/env node

import fs from "fs";

const filePath = "task.json";

const updateTask = (id, newDesc) => {
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
      const tasks = JSON.parse(data);
      const [ oldTask ] = tasks.filter((task) => task.id == id);
      const index = tasks.indexOf(oldTask);
      if (!oldTask) {
        console.error("No task found");
        process.exit(1);
      }
      oldTask.description = newDesc;
      tasks[index] = oldTask;
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
      console.log(`Task updated successfully (ID: ${id})`);
    }
  });
};

const [id, newDesc] = process.argv.slice(2);
updateTask(id, newDesc);
