const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskTitleInput = document.getElementById("Key");
const assigneeInput = document.getElementById("Value");
const taskDateInput = document.getElementById("ExpiredDate");
let tasks = [];

// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to get a cookie
function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("tasks");
    listItem.innerHTML = `
      <div class="flex w-[700px] justify-between border-2 p-2 rounded-[10px] text-slate-700 m-2 ml-0">
        <span>${task.key}</span>
        <span>${task.value}</span>
        <span>${task.exdate}</span>
        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-2 rounded" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(listItem);
  });
}

function addTask(event) {
  event.preventDefault();

  const key = taskTitleInput.value;
  const value = assigneeInput.value;
  const exdate = taskDateInput.value;

  const cookie = { key, value, exdate };
  tasks.push(cookie);
  setCookie("tasks", JSON.stringify(tasks), 30); // Store the tasks in a cookie for 30 days
  taskTitleInput.value = "";
  assigneeInput.value = "";
  taskDateInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  setCookie("tasks", JSON.stringify(tasks), 30); // Update the tasks cookie after deletion
  renderTasks();
}

taskForm.addEventListener("submit", addTask);

// Load tasks from the cookie when the page loads
const storedTasks = getCookie("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderTasks();
}
