// Create an array for each list
let tasksToDo = [];
let tasksFinished = [];
let tasksDeleted = [];

// List containers
let toDoList = document.getElementById("to-do-list");
let finishedList = document.getElementById("finished-list");
deletedList = document.getElementById("deleted-list");
let taskContainer = document.createElement("div");

// Create a task template (object or class): name, description, method to move task to other list
class Task {
  constructor(name, description, status) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.taskContainer = document.createElement("div");
    this.taskContainer.classList.add("task-element");
    this.taskAction = document.createElement("button");
    this.taskAction.innerText = "Action";
    this.taskDelete = document.createElement("button");
    this.taskDelete.innerText = "Delete";
    this.taskDelete.addEventListener("click", () => {
      this.removeTask();
    });
    this.taskLabel = document.createElement("label");
    this.taskLabel.innerText = this.status;
    this.taskContainer.innerHTML = `<h2>${this.name}</h2><p>${this.description}</p>`;
    this.taskContainer.append(this.taskDelete);
    this.taskContainer.append(this.taskAction);
    this.taskContainer.append(this.taskLabel);
    this.taskAction.addEventListener("click", () => {
      // Switch list
      if (this.status === "to do") {
        this.finishTask();
      } else if (this.status === "finished") {
        this.restoreTask();
      } else if (this.status === "deleted") {
        this.restoreTask();
      }
    });
  }

  finishTask() {
    // Move task to other list
    if (this.status === "to do" || this.status === "deleted") {
      tasksFinished.push(this);
      tasksToDo.splice(tasksToDo.indexOf(this), 1);
      this.status = "finished";
      finishedList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
    }
  }
  // Function to remove task
  removeTask() {
    if (this.status === "to do" || this.status === "finished") {
      tasksDeleted.push(this);
      tasksToDo.splice(tasksToDo.indexOf(this), 1);
      tasksFinished.splice(tasksDeleted.indexOf(this), 1);
      this.status = "deleted";
      //Remove from DOM
      deletedList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
    }
  }
  // Function to restore deleted task
  restoreTask() {
    if (this.status === "deleted" || this.status === "finished") {
      tasksToDo.push(this);
      tasksDeleted.splice(tasksDeleted.indexOf(this), 1);
      tasksFinished.splice(tasksDeleted.indexOf(this), 1);
      this.status = "to do";
      toDoList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
    }
  }
}

// Create a new task
function createTask() {
  let taskName = document.querySelector("#task-name").value;
  let taskDescription = document.querySelector("#task-description").value;
  let newTask = new Task(taskName, taskDescription, "to do");
  tasksToDo.push(newTask);
  toDoList.appendChild(newTask.taskContainer);
  // Log status
  console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);
  console.log(`Tasks finished: `, tasksFinished, `--------------------------------`);
  console.log(`Tasks deleted: `, tasksDeleted, `--------------------------------`);
  // Clear form
  document.querySelector("#task-name").value = "";
  document.querySelector("#task-description").value = "";
  return;
}

// Submit form to create a new task
let submitBtn = document.getElementById("create-button");
submitBtn.addEventListener("click", createTask);
