// import { db } from "./firebase-config.js";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   serverTimestamp,
//   query,
//   orderBy
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// const taskInput = document.getElementById("task");
// const dueDateInput = document.getElementById("dueDate");
// const priorityInput = document.getElementById("priority");
// const addTaskButton = document.getElementById("addTask");
// const taskList = document.getElementById("taskList");
// const completedTaskList = document.getElementById("completedTaskList");

// addTaskButton.addEventListener("click", async () => {
//   const title = taskInput.value.trim();
//   const dueDate = dueDateInput.value;
//   const priority = priorityInput.value;

//   if (!title || !dueDate) return alert("Enter both task and due date");

//   await addDoc(collection(db, "tasks"), {
//     title,
//     dueDate,
//     priority,
//     completed: false,
//     createdAt: serverTimestamp()
//   });

//   taskInput.value = "";
//   dueDateInput.value = "";
//   priorityInput.value = "low";
// });

// const tasksRef = query(collection(db, "tasks"), orderBy("createdAt", "asc"));

// onSnapshot(tasksRef, (snapshot) => {
//   taskList.innerHTML = "";
//   completedTaskList.innerHTML = "";

//   snapshot.docs.forEach(docSnap => {
//     const task = docSnap.data();
//     const id = docSnap.id;

//     const li = document.createElement("li");
//     li.classList.add("list");

    
//     li.innerHTML = `
//       <span class="taskName ${task.completed ? "completed" : ""}">
//         ${task.title} (${task.priority})
//       </span>
//       ${!task.completed ? `<p class="taskDueDate">Due: ${task.dueDate}</p>` : ""}
//       <button class="completeBtn">${task.completed ? "Undo" : "Complete"}</button>
//     `;

  
//     li.querySelector(".taskName").addEventListener("click", async () => {
//       await updateDoc(doc(db, "tasks", id), { completed: !task.completed });
//     });

//     li.querySelector(".completeBtn").addEventListener("click", async () => {
//       await updateDoc(doc(db, "tasks", id), { completed: !task.completed });
//     });

//     if (task.completed) {
//       completedTaskList.appendChild(li);
//     } else {
//       taskList.appendChild(li);
//     }
//   });
// });

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

// Inputs
const taskInput = document.getElementById("task");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");
const addTaskButton = document.getElementById("addTask");

// Lists
const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");

// ➕ Add Task
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

  // Reset inputs
  taskInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "low";
});

// 🔄 Real-time listener
const tasksRef = query(collection(db, "tasks"), orderBy("createdAt", "asc"));

onSnapshot(tasksRef, (snapshot) => {
  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";

  snapshot.docs.forEach((docSnap) => {
    const task = docSnap.data();
    const id = docSnap.id;

    const li = document.createElement("li");
    li.classList.add("list");

    // 🧱 Build task HTML
    li.innerHTML = `
      <span class="taskName ${task.completed ? "completed" : ""}">
        ${task.title} (${task.priority})
      </span>
      ${
        !task.completed
          ? `<p class="taskDueDate">Due: ${task.dueDate}</p>`
          : ""
      }
      <button class="completeBtn">
        ${task.completed ? "Undo" : "Complete"}
      </button>
      ${
        task.completed
          ? `<button class="deleteBtn">Delete</button>`
          : ""
      }
    `;

    // ✅ Toggle complete (click name)
    li.querySelector(".taskName").addEventListener("click", async () => {
      await updateDoc(doc(db, "tasks", id), {
        completed: !task.completed
      });
    });

    // ✅ Toggle complete (button)
    li.querySelector(".completeBtn").addEventListener("click", async () => {
      await updateDoc(doc(db, "tasks", id), {
        completed: !task.completed
      });
    });

    // 🗑️ Delete (ONLY if completed)
    if (task.completed) {
      li.querySelector(".deleteBtn").addEventListener("click", async () => {
        await deleteDoc(doc(db, "tasks", id));
      });
    }

    // 📦 Append to correct list
    if (task.completed) {
      completedTaskList.appendChild(li);
    } else {
      taskList.appendChild(li);
    }
  });
});