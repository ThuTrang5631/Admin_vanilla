import "../styles/_index.scss";

interface UserProps {
  id: number;
  fullName: string;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
}

//get users

const getDataUser = async () => {
  try {
    const res = await fetch("https://dummyjson.com/users");
    const data = await res.json();
    const users = data.users;
    displayDataUser(users);
    console.log("data", users);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getDataUser);

const displayDataUser = async (data: any) => {
  const tableTitleEle = document.getElementById("js-list")!;

  for (let r of data) {
    const row = document.createElement("tr");
    row.classList.add(`table__tr${r.id}`);
    row.innerHTML = `
        <td class="table__desc">${r.id}</td>
        <td class="table__desc">${r.lastName} ${r.firstName}</td>
        <td class="table__desc">${r.gender}</td>
        <td class="table__desc">${r.email}</td>
        <td class="table__desc">${r.phone}</td>
        <td class="table__desc">${r.birthDate}</td>
        <td class="table__desc table-todos">
        </td>
        `;
    tableTitleEle.appendChild(row);

    // get to do of users follow id user
    let todosList;

    try {
      const res = await fetch(`https://dummyjson.com/users/${r.id}/todos`);
      todosList = await res.json();
      console.log("dataTodo", todosList.todos);
    } catch (error) {
      console.log(error);
    }

    const parentElementTodo = document.querySelector(`.table__tr${r.id}`)!;
    const todoEle = parentElementTodo.querySelector(".table-todos")!;
    const listTodo = document.createElement("ul");

    for (let todo of todosList.todos) {
      listTodo.innerHTML += `
      <li class="flex justify-between">
        <p>${todo.todo}</p>
        <span>
          <i class="fa-solid ${todo.completed ? "fa-check" : "fa-x"}"></i>
        </span>
      </li>`;

      todoEle.appendChild(listTodo);
    }
  }
};
