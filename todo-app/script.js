const btn = document.querySelector("button");
const body = document.querySelector("body");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

// fetch dadta from server and log the data

const api = fetch("http://localhost:4730/todos");

let state = [];

function load() {
  api
    .then((data) => {
      console.log(data.ok);
      console.log(data.status);
      return data.json();
    })
    .then((json) => {
      state.push(json);
      console.log(state);
    });
}

// create todos in the todo-Api
let newTodoSt = {};
btn.addEventListener("click", function () {
  // Space be trimmed
  const newToDoText = input.value.trim();
  //if not empty create an newTodo
  if (newToDoText != "") {
    const newTodo = {
      description: newToDoText,
      done: false,
    };
    newTodoSt = newTodo;
    post();
    load();
  }
});

// POST/ is append to the btn

function post() {
  fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTodoSt),
  })
    .then((res) => res.json())
    .then((newTodoFromApi) => {
      // new todo from api with ID

      console.log(newTodoFromApi);

      newTodoSt.length = 0;
    });
}
