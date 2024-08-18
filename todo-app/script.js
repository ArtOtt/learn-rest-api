const btn = document.querySelector("button");
const body = document.querySelector("body");
const list = document.querySelector("#list");
const input = document.querySelector("#input");
const deleteBtn = document.querySelector("#btn-delete");
// fetch dadta from server and log the data

const api = "http://localhost:4730/todos";

let state = [];

function load() {
  state.length = 0;
  fetch(api)
    .then((data) => {
      //console.log(data.ok);
      //   console.log(data.status);
      return data.json();
    })
    .then((json) => {
      state.push(...json);
      //   console.log(state);
      render();
    });
}
load();

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
    render();
    input.value = "";
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
      //   console.log(newTodoFromApi);

      newTodoSt.length = 0;
    });
}

//render from state

function render() {
  // Clean the ul
  list.innerHTML = "";

  // Put the todos frtom state in DOM
  state.forEach((todo) => {
    // Create an Li Element
    const liElement = document.createElement("li");

    // To find out which checkbox clicked
    liElement.toDoObject = todo;

    // Create a checkbox for Li Element
    const checkbox = document.createElement("input");
    // Add a type Attribute to checkbox
    checkbox.type = "checkbox";
    // Add to checked Attribute a value from toDo.todos.done
    checkbox.checked = todo.done;
    // Add the checkbox to Li Element/liElement
    liElement.appendChild(checkbox);

    // Create an inner Text for liElement
    const liText = document.createTextNode(todo.description);
    // Join liText with liElement
    liElement.append(liText);

    // Add liElement to list Element
    list.appendChild(liElement);
  });
}

// Check if checkbox is checked
list.addEventListener("change", (e) => {
  const checkbox = e.target;
  const liElement = checkbox.parentElement;
  const todo = liElement.toDoObject;
  todo.done = checkbox.checked;
  const id = todo.id;

  fetch("http://localhost:4730/todos/" + id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((updatedTodoFromApi) => {
      // new todo from api with ID
      //   console.log(updatedTodoFromApi);
    });
});

//remove done todos
deleteBtn.addEventListener("click", function () {
  state = state.filter((todo) => todo.done === true);

  state.map((todoItem) => {
    fetch("http://localhost:4730/todos/" + todoItem.id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {});
  });
  load();
  render();
});
