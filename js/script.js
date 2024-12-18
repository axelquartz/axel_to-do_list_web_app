// Create an array for each list
let tasksToDo = [];
let tasksFinished = [];
let tasksDeleted = [];

// List containers
let toDoList = document.getElementById("to-do-list");
let finishedList = document.getElementById("finished-list");
let deletedList = document.getElementById("deleted-list");
let taskContainer = document.createElement("div");

// Form to create task container
let createTaskForm = document.getElementById("create-task-form");

// Create a task Class with its properties and methods
class Task {
  constructor(name, description, status) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.taskContainer = document.createElement("div");
    this.taskContainer.classList.add("task-element");
    this.taskAction = document.createElement("button");
    this.taskAction.innerText = "Finish";
    this.taskDelete = document.createElement("button");
    this.taskDelete.innerText = "Delete";
    this.taskDelete.addEventListener("click", () => {
      this.removeTask();
    });
    this.taskLabel = document.createElement("label");
    this.taskLabel.innerText = this.status;
    this.taskContainer.innerHTML = `<label>${this.status}</label><h3>${this.name}</h3><p>${this.description}</p>`;
    this.taskDelete.classList.add("delete-button");
    this.taskContainer.append(this.taskDelete);
    this.taskContainer.append(this.taskAction);

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
    if (this.status === "to do" || this.status === "deleted") {
      tasksFinished.push(this);
      tasksToDo.splice(tasksToDo.indexOf(this), 1);
      this.status = "finished";
      finishedList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
      // Log status
      console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);
      console.log(`Tasks finished: `, tasksFinished, `--------------------------------`);
      console.log(`Tasks deleted: `, tasksDeleted, `--------------------------------`);
    }
  }
  // Function to remove task\
  removeTask() {
    if (this.status === "to do") {
      tasksDeleted.push(this);
      tasksToDo.splice(tasksToDo.indexOf(this), 1);
      this.status = "deleted";
      //Remove from DOM
      deletedList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
      // Log status
      console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);
      console.log(`Tasks finished: `, tasksFinished, `--------------------------------`);
      console.log(`Tasks deleted: `, tasksDeleted, `--------------------------------`);
    } else if (this.status === "finished") {
      tasksDeleted.push(this);
      tasksFinished.splice(tasksFinished.indexOf(this), 1);
      this.status = "deleted";
      //Remove from DOM
      deletedList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
      // Log status
      console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);
      console.log(`Tasks finished: `, tasksFinished, `--------------------------------`);
      console.log(`Tasks deleted: `, tasksDeleted, `--------------------------------`);
    }
  }
  // Function to restore deleted task
  restoreTask() {
    if (this.status === "deleted") {
      tasksToDo.push(this);
      tasksDeleted.splice(tasksDeleted.indexOf(this), 1);
      this.status = "to do";
      toDoList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
      // Log status
      console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);
      console.log(`Tasks finished: `, tasksFinished, `--------------------------------`);
      console.log(`Tasks deleted: `, tasksDeleted, `--------------------------------`);
    } else if (this.status === "finished") {
      tasksToDo.push(this);
      tasksFinished.splice(tasksFinished.indexOf(this), 1);
      this.status = "to do";
      toDoList.appendChild(this.taskContainer);
      this.taskLabel.innerText = this.status;
      // Log status
      console.log(`Tasks to do: `, tasksToDo, `--------------------------------`);
      console.log(`Tasks finished: `, tasksFinished, `--------------------------------`);
      console.log(`Tasks deleted: `, tasksDeleted, `--------------------------------`);
    }
  }
}

// Create a new task
function createTask() {
  createTaskForm.style.display = "none";
  coverContainer.classList.remove("cover");

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

// Open form to create a new task
let openTaskForm = document.getElementById("create-task-button");
let coverContainer = document.querySelector("#cover-placeholder");

openTaskForm.addEventListener("click", () => {
  createTaskForm.style.display = "flex";
  coverContainer.classList.add("cover");
});

// Submit form to create a new task
let submitBtn = document.getElementById("create-button");
submitBtn.addEventListener("click", createTask);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTask();
  }
});

// Close form to create a new task (Cancel)
let cancelBtn = document.getElementById("cancel-button");
cancelBtn.addEventListener("click", () => {
  createTaskForm.style.display = "none";
  coverContainer.classList.remove("cover");
  document.querySelector("#task-name").value = "";
  document.querySelector("#task-description").value = "";
});
