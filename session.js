const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskTitleInput = document.getElementById("taskTitle");
const assigneeInput = document.getElementById("assignee");
const taskDateInput = document.getElementById("taskDate");
let tasks = JSON.parse(sessionStorage.getItem("tasks")) || [];
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("tasks");
    listItem.innerHTML = `
      <div class="flex w-[700px] justify-between border-2 p-2 rounded-[10px] text-slate-700 mb-[4px]">
        <span>${task.title}</span>
        <span>${task.assignee}</span>
        <span>${task.date}</span>
        <button class="bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-2 rounded" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(listItem);
  });
}
function addTask(event) {
  event.preventDefault();

  const title = taskTitleInput.value;
  const assignee = assigneeInput.value;
  const date = taskDateInput.value;

  const task = { title, assignee, date };
  tasks.push(task);
  sessionStorage.setItem("tasks", JSON.stringify(tasks));
  taskTitleInput.value = "";
  assigneeInput.value = "";
  taskDateInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);

  sessionStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
}

taskForm.addEventListener("submit", addTask);

renderTasks();
