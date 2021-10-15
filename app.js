// Put focus on inputfield on load
window.onload = function() {
    document.getElementById("input").focus();
};

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// FUNCTIONS GO HERE

/* Our approach to do this
  <div class="todo">
  <li>Our new To Do</li>
  <button>delete</button>
  <button>checked</button>
  </div> 
  */

//ADD ITEM FUNCTION
function addTodo(e) {
    e.preventDefault();
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create list element
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    // place this li within its parent div
    todoDiv.appendChild(newTodo);
    // ADD LI TO localStorage
    saveLocalTodos(todoInput.value);
    // create checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fa fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Now append the whole todo segment within the list
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = "";
}

// DELETE ITEM  FUNCTION
function deleteCheck(e) {
    // console.log(e.target);
    const item = e.target;
    // delete to do
    if (item.classList[0] === "trash-btn") {
        // remove the parent of the button
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalStorageTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }
    // check to do
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// FILTER FUNCTIONS
function filterTodo(e) {
    // grab all todos
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
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

// code below is all about localstorage

function saveLocalTodos(todo) {
    // check on localstorage
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if it doesnt exist
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // take action
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    // check on localstorage
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if it doesnt exist
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // take action
    todos.forEach(function(todo) {
        //create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create list element
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        // place this li within its parent div
        todoDiv.appendChild(newTodo);
        // create checked button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fa fa-check'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fa fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Now append the whole todo segment within the list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalStorageTodos(todo) {
    // check on localstorage
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if it doesnt exist
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // grab index value of innerText
    const todoIndex = todo.children[0].innerText;
    // checks in log
    //   console.log(todo.children[0].innerText);
    //   console.log(todos.indexOf("watermelon"));
    // use splice function to remove from the index plus how many times
    todos.splice(todos.indexOf(todoIndex), 1);
    // set back that updated localstorage array
    localStorage.setItem("todos", JSON.stringify(todos));
}