//Prompt
const prompt = require("prompt-sync")({ sigint: true });
// Create an array for each list
let tasksToDo = [];
let tasksFinished = [];
let tasksDeleted = [];

// Create a task template (object or class): name, description, method to move task to other list
class Task {
  constructor(name, description, status) {
    this.name = name;
    this.description = description;
    this.status = status;
  }

  deleteTask() {
    // Move task to other list
    if (this.status === "to do" || this.status === "deleted") {
      tasksFinished.push(this);
      tasksToDo.splice(tasksToDo.indexOf(this), 1);
      this.status = "finished";
    }
  }
  // Function to remove task
  removeTask() {
    if (this.status === "to do" || this.status === "finished") {
      tasksDeleted.push(this);
      tasksToDo.splice(tasksToDo.indexOf(this), 1);
      tasksFinished.splice(tasksDeleted.indexOf(this), 1);
      this.status = "deleted";
    }
  }
  // Function to restore deleted task
  restoreTask() {
    if (this.status === "deleted" || this.status === "finished") {
      tasksToDo.push(this);
      tasksDeleted.splice(tasksDeleted.indexOf(this), 1);
      tasksFinished.splice(tasksDeleted.indexOf(this), 1);
      this.status = "to do";
    }
  }
}

// Manually create a couple of new tasks and push them to the tasksToDo array
let newTask1 = new Task("task 1", "description 1", "to do");
tasksToDo.push(newTask1);
let newTask2 = new Task("task 2", "description 2", "to do");
tasksToDo.push(newTask2);

// Move a task from one list to another

// Create task from user prompt (maybe with a for loop)
function createTask() {
  let taskName = "New added Name";
  let taskDescription = "New added Description";
  let newTask = new Task(taskName, taskDescription, "to do");
  tasksToDo.push(newTask);
  // Log status
  // console.log(`Tasks to do: `, tasksToDo);
  // console.log(`Tasks finished: `, tasksFinished);
  // console.log(`Tasks deleted: `, tasksDeleted);
  return;
}

createTask();
createTask();
newTask2.removeTask();
newTask1.deleteTask();

// Log status
console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);
console.log(
  `Tasks finished: `,
  tasksFinished,
  `--------------------------------`
);
console.log(`Tasks deleted: `, tasksDeleted);
