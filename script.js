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

  moveTask() {
    // Move task to other list
    if (this.status === "to do") {
      tasksFinished.push(this);
      tasksToDo.splice(tasksToDo.indexOf(this), 1);
      this.status = "finished";
    } else if (this.status === "finished") {
      tasksToDo.push(this);
    }
  }
}

// Manually create a couple of new tasks and push them to the tasksToDo array
let newTask1 = new Task("task 1", "description 1", "to do");
tasksToDo.push(newTask1);
let newTask2 = new Task("task 2", "description 2", "to do");
tasksToDo.push(newTask2);

// Move a task from one list to another
newTask1.moveTask();
// newTask2.moveTask();

// Create task from user prompt

// Log status
console.log(`Tasks to do: `, tasksToDo);
console.log(`Tasks finished: `, tasksFinished);
console.log(`Tasks deleted: `, tasksDeleted);
