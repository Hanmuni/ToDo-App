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

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.checked = taskObj.completed;

  checkboxEl.classList.add("task-checkbox");
  checkboxEl.dataset.id = taskObj.id;

  const taskTextEl = document.createElement("span");
  if (taskObj.completed) {
    taskTextEl.classList.add("line-through");
  }
  taskTextEl.textContent = taskObj.task;

  const deleteImgEl = document.createElement("img");
  deleteImgEl.src = "assets/img/delete.svg";
  deleteImgEl.classList.add("task-delete");
  deleteImgEl.dataset.id = taskObj.id;

  taskWrapperEl.append(checkboxEl, taskTextEl, deleteImgEl);

  return taskWrapperEl;
};

const onInputKeydown = (e) => {
  if (e.key === "Enter") {
    onAddTaskClick();
  } else {
    return;
  }
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

    const foundTask = tasks.find((taskObj) => taskObj.id === clickedTaskId);

    foundTask.completed = !foundTask.completed;

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

  try {
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }
  } catch (error) {
    console.log(error);
  }

  updateUI();

  addBtnEl.addEventListener("click", onAddTaskClick);
  inputEl.addEventListener("keydown", onInputKeydown);
  tasksListEl.addEventListener("click", onTaskContainerClick);
};

init();
