"use strict";

const newtodoForm = document.querySelector("#new-todo-form");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const todoList = document.querySelector("#todo-list");

newtodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    done: false,
    time: Date.now(),
  };
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  e.target.reset();
  displayTodo(todos);
});


function displayTodo(todos) {
  todoList.innerHTML = "";
  todos
    .sort((a, b) => b.time - a.time)
    .map((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const editBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      input.type = "checkbox";
      input.checked = todo.done;
      span.classList.add("bubble");

      span.classList.add(todo.category == "personal" ? "personal" : "business");
      content.classList.add("todo-content");
      actions.classList.add("actions");
      editBtn.classList.add("edit");
      deleteBtn.classList.add("delete");

      content.innerHTML = `<input type="text" value="${timeSetUp(todo)} ${
        todo.content
      } " readonly>`;
      editBtn.innerHTML = "Edit";
      deleteBtn.innerHTML = "Delete";

      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);
      todoList.appendChild(todoItem);

      if (todo.done) {
        todoItem.classList.add("done");
      }
      input.addEventListener("click", (e) => {
        todo.done = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));

        if (todo.done) {
          todoItem.classList.add("done");
        } else {
          todoItem.classList.remove("done");
        }
        displayTodo(todos);
      });

      editBtn.addEventListener("click", () => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.value = " ";
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          displayTodo(todos);
        });
      });

      deleteBtn.addEventListener("click", (e) => {
        todos = todos.filter((t) => t !== todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodo(todos);
      });
    });
}


window.addEventListener("load", (e) => {
  displayTodo(todos);
});

function timeSetUp(todo) {
  const date = new Date(todo.time);
  return date.toLocaleTimeString();
}
