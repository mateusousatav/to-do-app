import { db } from "./firebase-config.js";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const taskInput = document.getElementById("task");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const addTaskButton = document.getElementById("addTask");

const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");

addTaskButton.addEventListener("click", async () => {
  const title = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (!title || !dueDate) {
    alert("Enter both task and due date");
    return;
  }

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

const tasksRef = query(collection(db, "tasks"), orderBy("createdAt", "asc"));

onSnapshot(tasksRef, (snapshot) => {
  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";

  snapshot.docs.forEach((docSnap) => {
    const task = docSnap.data();
    const id = docSnap.id;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="taskLeft">
        <div class="taskName ${task.completed ? "completed" : ""}">
          ${task.title} (${task.priority})
        </div>
        ${
          !task.completed
            ? `<div class="taskDueDate">Due: ${task.dueDate}</div>`
            : ""
        }
      </div>

      <div class="taskActions">
        <button class="listButton completeBtn">
          ${task.completed ? "Undo" : "Done"}
        </button>
        ${
          task.completed
            ? `<button class="deleteBtn">Delete</button>`
            : ""
        }
      </div>
    `;

    // Toggle complete
    li.querySelector(".completeBtn").addEventListener("click", async () => {
      await updateDoc(doc(db, "tasks", id), {
        completed: !task.completed
      });
    });

    if (task.completed) {
      li.querySelector(".deleteBtn").addEventListener("click", async () => {
        await deleteDoc(doc(db, "tasks", id));
      });
    }

    if (task.completed) {
      completedTaskList.appendChild(li);
    } else {
      taskList.appendChild(li);
    }
  });
});