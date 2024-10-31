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

function createTask() {
  let taskName = document.querySelector("#task-name").value;
  let taskDescription = document.querySelector("#task-description").value;
  let thisTask = new Task(taskName, taskDescription, "to do");
  tasksToDo.push(thisTask);
  // Append task to To Do list
  let toDoList = document.getElementById("to-do-list");
  let taskContainer = document.createElement("div");
  taskContainer.innerHTML = `<div class="task-element"><h2>${thisTask.name}</h2><p>${thisTask.description}</p></div>`;
  toDoList.appendChild(taskContainer);
  // Log status
  console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);

  // return;
}

// Submit form to create a new task
let submitBtn = document.getElementById("create-button");
submitBtn.addEventListener("click", createTask);
