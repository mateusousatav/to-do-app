import { db } from "./firebase-config.js";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const taskInput = document.getElementById("task");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");
const clearCompletedButton = document.getElementById("clearCompleted");
const completeAllButton = document.getElementById("completeAll");

let currentFilter = "all";

addTaskButton.addEventListener("click", async () => {
  const title = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (!title || !dueDate) return alert("Enter task & due date");

  await addDoc(collection(db, "tasks"), {
    title,
    dueDate,
    priority,
    completed: false,
    createdAt: serverTimestamp()
  });

  taskInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "low";
});

document.getElementById("filterAll").onclick = () => { currentFilter = "all"; };
document.getElementById("filterCompleted").onclick = () => { currentFilter = "completed"; };
document.getElementById("filterPending").onclick = () => { currentFilter = "pending"; };

onSnapshot(collection(db, "tasks"), (snapshot) => {
  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const task = docSnap.data();
    const id = docSnap.id;

    if (currentFilter === "completed" && !task.completed) return;
    if (currentFilter === "pending" && task.completed) return;

    const li = document.createElement("div");
    li.classList.add("list");

    li.innerHTML = `
      <li class="taskName ${task.completed ? "completed" : ""}">
        ${task.title} (${task.priority})
      </li>
      <button class="listButton">${task.completed ? "✓" : ""}</button>
      <p class="taskDueDate">Due: ${task.dueDate}</p>
      <button class="deleteBtn">🗑</button>
    `;

    li.querySelector(".listButton").addEventListener("click", async () => {
      await updateDoc(doc(db, "tasks", id), {
        completed: !task.completed
      });
    });

    li.querySelector(".deleteBtn").addEventListener("click", async () => {
      await deleteDoc(doc(db, "tasks", id));
    });

    if (task.completed) {
      completedTaskList.appendChild(li);
    } else {
      taskList.appendChild(li);
    }
  });
});

clearCompletedButton.addEventListener("click", async () => {
  const snapshot = await collection(db, "tasks").get();
  snapshot.forEach(async docSnap => {
    const task = docSnap.data();
    if (task.completed) {
      await deleteDoc(doc(db, "tasks", docSnap.id));
    }
  });
});

completeAllButton.addEventListener("click", async () => {
  const snapshot = await collection(db, "tasks").get();
  snapshot.forEach(async docSnap => {
    const task = docSnap.data();
    if (!task.completed) {
      await updateDoc(doc(db, "tasks", docSnap.id), { completed: true });
    }
  });
});