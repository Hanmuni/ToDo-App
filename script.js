let tasks = [];

const inputEl = document.querySelector("#input");
const addBtnEl = document.querySelector("#add");
const tasksListEl = document.querySelector("#tasks");

const saveTaskInLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTaskElement = (taskObj) => {
  const taskWrapperEl = document.createElement("div");
  taskWrapperEl.classList.add("task");

  const checkboxImgEl = document.createElement("img");
  if (!taskObj.completed) {
    checkboxImgEl.src = "assets/img/unchecked.png";
  } else {
    checkboxImgEl.src = "assets/img/checked.png";
  }
  checkboxImgEl.classList.add("task-checkbox");
  checkboxImgEl.dataset.id = taskObj.id;

  const taskTextEl = document.createElement("span");
  if (taskObj.completed) {
    taskTextEl.classList.add("line-through");
  }
  taskTextEl.textContent = taskObj.task;

  const deleteImgEl = document.createElement("img");
  deleteImgEl.src = "assets/img/delete.png";
  deleteImgEl.classList.add("task-delete");
  deleteImgEl.dataset.id = taskObj.id;

  taskWrapperEl.append(checkboxImgEl, taskTextEl, deleteImgEl);

  return taskWrapperEl;
};

const onAddTaskClick = () => {
  const inputText = inputEl.value;

  if (inputText === "") {
    return;
  }

  const newTask = {
    task: inputText,
    completed: false,
    id: Date.now(),
  };

  tasks.push(newTask);

  inputEl.value = "";

  updateUI();
  saveTaskInLocalStorage();
};

const onTaskContainerClick = (e) => {
  if (e.target.classList.contains("task-delete")) {
    const clickedTaskId = Number(e.target.dataset.id);

    tasks = tasks.filter((taskObj) => taskObj.id !== clickedTaskId);

    updateUI();
    saveTaskInLocalStorage();
  } else if (e.target.classList.contains("task-checkbox")) {
    const clickedTaskId = Number(e.target.dataset.id);

    tasks.forEach((taskObj) => {
      if (taskObj.id === clickedTaskId) {
        taskObj.completed = !taskObj.completed;
      }
    });

    updateUI();
    saveTaskInLocalStorage();
  }
};

const updateUI = () => {
  tasksListEl.innerHTML = "";

  tasks.forEach((taskObj) => {
    const newTaskElement = createTaskElement(taskObj);
    tasksListEl.append(newTaskElement);
  });
};

const init = () => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  updateUI();

  addBtnEl.addEventListener("click", onAddTaskClick);
  tasksListEl.addEventListener("click", onTaskContainerClick);
};

init();
