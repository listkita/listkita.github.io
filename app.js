//
// Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//
// EventListener
// Munculkan local storage
document.addEventListener("DOMContentLoaded", getTodos);

// tambah
todoButton.addEventListener("click", addTodo);

// hapus
todoList.addEventListener("click", deleteCheck);

// filter
filterOption.addEventListener("click", filterTodo);

//
// Function buat list
function addTodo(event) {
  // Prevent untuk submit
  event.preventDefault();

  //   Membuat div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //   Membuat li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Simpan todo ke local storage
  saveLocalTodos(todoInput.value);

  // Membuat tombol check
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class= "fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Membuat tombol trash
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Pindahkan ke todoList
  todoList.appendChild(todoDiv);

  // Hilangkan todo saat submit
  todoInput.value = "";
}

// function hapus dan selesai
function deleteCheck(e) {
  const item = e.target;

  // hapus
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // selesai
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// function filter
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Fungsi simpan ke local storage
function saveLocalTodos(todo) {
  // Cek apakah sudah ada listnya
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Fungsi tampilkan local storage
function getTodos(todo) {
  // Cek apakah sudah ada listnya
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //   Membuat div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //   Membuat li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Membuat tombol check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Membuat tombol trash
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Pindahkan ke todoList
    todoList.appendChild(todoDiv);
  });
}

// Hilangkan local storage
function removeLocalTodos(todo) {
  // Cek apakah sudah ada listnya
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
