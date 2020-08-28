//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(e){
    // Prevent form from submitting
    e.preventDefault();
    // ToDo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo= document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item"); 
    // Append this li to the div
    todoDiv.appendChild(newTodo);
    // Checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Now add the todoDiv to the UL
    todoList.appendChild(todoDiv);
    // Clear input after adding item
    todoInput.value = "";
}

function deleteCheck(e){
    // console.log(e.target);
    const item = e.target;

    //Delete todo
    if(item.classList[0] === "trash-btn"){
        // dont delete the button but the parent and create fall for an effect
        const todo = item.parentElement;
        // Add Animate first
        todo.classList.add("fall");
        // now really delete it with
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });

    }

    // Check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


// Add filter function and loop over these where clicked
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}