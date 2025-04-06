/**
 * Enum for task statuses.
 * @readonly
 * @enum {{name: string}}
 */
const TaskStatus = Object.freeze({
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
});

class Task {
  constructor(id = 1, description = "", status = TaskStatus.TODO, createdAt = new Date().toISOString(), updatedAt) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  update(description = undefined, status = undefined) {
    this.description = description ?? this.description;
    this.status = status ?? this.status;
    if (description || status) this.updatedAt = new Date().toISOString();
  }
}

const parseJsonToTasks = (jsonString) => {
  const list = JSON.parse(jsonString);
  const tasks = list.map((element) => {
    return new Task(element.id, element.description, element.status, element.createdAt, element.updatedAt);
  })
  return tasks;
}

export { Task, TaskStatus, parseJsonToTasks };
