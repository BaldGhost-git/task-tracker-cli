# Task Tracker CLI

A simple task-tracker CLI, as a submission for [roadmap.sh challenge](https://roadmap.sh/projects/task-tracker)

## Prerequisites
- Node.js
- NPM

## Installation
Clone this repo
```bash
git clone https://github.com/BaldGhost-git/task-tracker-cli.git
```

Then, either you installed it locally
```bash
cd task-tracker-cli
npm install
```

Or globally
```bash
npm install -g task-tracker-cli
```

## Usage
### `add <desc>`

Insert a new task with a description. `<desc>` should be enclosed with double quotes ("").
```bash
task-tracker add "first task"
```

### `update <id> <desc>`
Update a task with new description. `<id>` should be a number, not a string
```bash
task-tracker update 1 "task 1"
``` 

### `list`
Outputs all task
```bash
task-tracker list
```

### `mark <id> [ in-progress | done ]`
Mark a task as work in progress or done.
```bash
task-tracker 1 in-progress
```

### `delete <id>`
Delete a task.
```bash
task-tracker delete 1
```
