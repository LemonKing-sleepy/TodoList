const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoUL = document.getElementById("todo-items");

let todoList = getItem();
todoUpdate();
console.log("JavaScript loaded!");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText.length > 0) {
    const todoObj = {
      text: todoText,
      state: false,
    };
    todoList.push(todoObj);
    todoUpdate();
    saveTodos();
    todoInput.value = "";
  }
}

function todoUpdate() {
  todoUL.innerHTML = "";
  todoList.forEach((todo, todoIdx) => {
    const todoItem = createTodoItem(todo, todoIdx);
    todoUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIdx) {
  const todoId = "todo-" + todoIdx;
  const todoText = todo.text;
  const todoLi = document.createElement("li");
  todoLi.className = "todo";
  todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}">
    <label class="custom-checkbox" for="${todoId}">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>
    <label for="${todoId}" class="todo-text">
        ${todoText}
    </label>
    <button class="delete-button">
        <svg fill="var(--second)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
    </button>
    `;

  const deleteButton = todoLi.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIdx);
  });

  const checkbox = todoLi.querySelector("input");
  checkbox.addEventListener("change", () => {
    todoList[todoIdx].state = checkbox.checked;
    saveTodos();
  });

  checkbox.checked = todo.state;
  return todoLi;
}

function deleteTodoItem(todoIdx) {
  todoList = todoList.filter((_, i) => i !== todoIdx);
  saveTodos();
  todoUpdate();
}

function saveTodos() {
  const todosJson = JSON.stringify(todoList);
  localStorage.setItem("todo", todosJson);
}

function getItem() {
  const todos = localStorage.getItem("todo") || "[]";
  return JSON.parse(todos);
}
