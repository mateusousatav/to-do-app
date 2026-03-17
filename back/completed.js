// Select DOM elements
const completedTaskList = document.getElementById("completedTaskList");
const clearCompletedButton = document.getElementById("clearCompleted");

// Load completed tasks from localStorage
function loadCompletedTasks() {
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    // Clear the current list
    completedTaskList.innerHTML = "";

    // Populate the list with completed tasks
    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("completedTask");

        taskItem.innerHTML = `
            <span class="taskName">${task.name}</span>
            <span class="taskDueDate">Due: ${task.dueDate}</span>
        `;

        completedTaskList.appendChild(taskItem);
    });
}

// Clear all completed tasks
clearCompletedButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all completed tasks?")) {
        localStorage.removeItem("completedTasks");
        loadCompletedTasks();
    }
});

// Initialize the page
loadCompletedTasks();