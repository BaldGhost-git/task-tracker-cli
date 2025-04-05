import { DateTime } from "luxon";

/**
 * Enum for task statuses.
 * @readonly
 * @enum {{name: string}}
 */
const TaskStatus = Object.freeze({
  TODO: { name: "todo" },
  IN_PROGRESS: { name: "in-progress" },
  DONE: { name: "done" },
});

class Task {
  constructor(id = 1, description = "", status = TaskStatus.TODO.name) {
    this.description = description;
    this.status = status;
    this.createdAt = DateTime.now().toISO();
    this.id = id;
  }
}

export { Task, TaskStatus };
