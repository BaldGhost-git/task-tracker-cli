#!/usr/bin/env node

import {argv} from "node:process";
import { addTask } from './bin/task_add.js';
import { deleteTask } from './bin/task_delete.js';
import { readTasks } from './bin/task_list.js';
import { markTask } from './bin/task_mark_status.js';
import { updateTask } from './bin/task_update.js';

const command = argv[2];

switch (command) {
  case "add":
    const desc = argv[3];
    addTask(desc);
    break;
  case "delete":
    const id = argv[3];
    deleteTask(id);
    break;
  case "list":
    readTasks();
    break;
  case "update":
    const [i, newDesc] = argv.slice(3);
    updateTask(i, newDesc);
    break;
  case "mark":
    const [j, status] = argv.slice(3);
    markTask(j, status);
    require("./bin/task_mark_status.js");
    break;
  case "help":
    defauilt: console.log(`
    ===============================
            Task Tracker CLI 📋
    ===============================

    A simple task tracking tool, as a solution to roadmap.sh challenge
    https://roadmap.sh/projects/task-tracker
    
    Usage:
        task-tracker <command> [options]
    
    Commands:
        add <desc>                  Add a new task
                                    Example: task-tracker add "Buy groceries"
    
        delete <taskId>             Delete a task by its ID
                                    Example: task-tracker delete 3
    
        list                        List all tasks
                                    Example: task-tracker list
    
        mark <taskId> [ in-progress| done ]
                                    Mark a task as in-progress or done
                                    Example: task-tracker mark 2 done
    
        update <taskId> <newTask>   Update the task content
                                    Example: task-tracker update 4 "Buy groceries and cook dinner"
    
    Notes:
        - Task IDs are shown in the list command output.
        - All data is stored locally in a task.json file.
    
    Happy tracking! ✅
    `);
    break;
}
