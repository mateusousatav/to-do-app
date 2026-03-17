const taskInput = document.getElementById("task");
const dueDateInput = document.getElementById("dueDate");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const completeAllButton = document.getElementById("completeAll");

// Add a new task
addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskName === "" || dueDate === "") {
        alert("Please enter both a task and a due date.");
        return;
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("list");

    taskItem.innerHTML = `
        <li class="taskName">${taskName}</li>
        <button class="listButton">✓</button>
        <p class="taskDueDate">Due Date: ${dueDate}</p>
    `;

    // Add event listener to the checkbox
    const checkButton = taskItem.querySelector(".listButton");
    checkButton.addEventListener("click", () => {
        checkButton.classList.add("completed");
        taskItem.querySelector(".taskName").classList.add("completed");
        moveToCompleted(taskItem);
    });

    taskList.appendChild(taskItem);

    // Clear input fields
    taskInput.value = "";
    dueDateInput.value = "";
});

// Move task to completed tasks page
function moveToCompleted(taskItem) {
    taskItem.remove();
    // Here, you can implement logic to save the completed task to localStorage
    // or send it to the "completed.html" page dynamically.
    alert("Task moved to completed tasks!");
}

// Complete all tasks
completeAllButton.addEventListener("click", () => {
    const allTasks = taskList.querySelectorAll(".list");
    allTasks.forEach(taskItem => {
        const checkButton = taskItem.querySelector(".listButton");
        checkButton.classList.add("completed");
        taskItem.querySelector(".taskName").classList.add("completed");
        moveToCompleted(taskItem);
    });
});