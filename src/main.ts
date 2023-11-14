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
let totalUsers;
let maxPage;
const limit = 20;
let skip = 0;
let userFinal: any;
const tableTitleEle = document.getElementById("js-list")!;
const popUpDeleteEle = document.getElementById("js-popupdelete");

const getDataUser = async () => {
  try {
    const res = await fetch(
      `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
    );
    const data = await res.json();
    const users = data.users;
    displayDataUser(users);
    userFinal = users[users.length - 1];
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getDataUser);

const displayDataUser = async (data: any) => {
  tableTitleEle.innerHTML = "";

  for (let r of data) {
    const row = document.createElement("tr");
    row.classList.add(`table__tr${r.id}`);
    row.innerHTML = `
        <td class="table__desc">${r.id}</td>
        <td class="table__desc">${r.lastName} ${r.firstName}</td>
        <td class="table__desc">${r.gender}</td>
        <td class="table__desc">${r.email}</td>
        <td class="table__desc">${r.phone}</td>
        <td class="table__desc">${r.birthDate
          .split("-")
          .reverse()
          .join("/")}</td>
        <td class="table__desc table-todos">
        </td>
        <td class="table__desc text-center justify-center"><button id="js-openpopupdelete-${
          r.id
        }" class="btn btn-delete"><i class="fa-solid fa-trash"></i></button></td>
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

    if (todosList.todos.length) {
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
    } else {
      listTodo.innerHTML = `<li>NO TODO </li>`;
      todoEle.appendChild(listTodo);
    }

    // DELETE user
    const btnOpenPopUpDeleteEle = document.getElementById(
      `js-openpopupdelete-${r.id}`
    );

    btnOpenPopUpDeleteEle?.addEventListener("click", () => {
      popUpDeleteEle?.classList.remove("hidden");
      popUpDeleteEle?.classList.add("flex");

      const btnDeleteEle = document.getElementById("js-delete");

      // delete functions
      btnDeleteEle?.addEventListener("click", async () => {
        try {
          const res = await fetch(`https://dummyjson.com/users/${r.id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          console.log("data", data);

          if (data.isDeleted) {
            popUpDeleteEle?.classList.add("hidden");
            popUpDeleteEle?.classList.remove("flex");
            const elementDeleted = document.querySelector(`.table__tr${r.id}`);
            elementDeleted?.remove();
          }
        } catch (error) {
          console.log(error);
          window.alert("not delete");
        }
      });
    });
  }
};

// Close Popup delete
const closePopUp = () => {
  popUpDeleteEle?.classList.add("hidden");
  popUpDeleteEle?.classList.remove("flex");
};

const btnClosePopUp = document.getElementsByClassName("js-btn-cancel");

console.log("btnClosePopUp", btnClosePopUp);
for (let i = 0; i < btnClosePopUp.length; i++) {
  btnClosePopUp[i].addEventListener("click", closePopUp);
}

// ADD USER
let isOpenPopUpAddUser = false;
const btnPopUpAddUserEle = document.getElementById("js-openpopup-adduser");
const popUpAddUserEle = document.getElementById("js-popupcreateuser");
const btnCancelPopUpAddUserEle = document.getElementById(
  "js-btn-cancel-adduser"
);
const btnAddUser = document.getElementById("js-adduser");
const firstNameAddEle = document.getElementById(
  "js-first-name"
) as HTMLInputElement;
const lastNameAddEle = document.getElementById(
  "js-last-name"
) as HTMLInputElement;
const emailAddEle = document.getElementById("js-email") as HTMLInputElement;
const phoneAddEle = document.getElementById("js-phone") as HTMLInputElement;
const genderAddEle = document.getElementById("js-gender") as HTMLInputElement;
const birthDateAddEle = document.getElementById("js-date") as HTMLInputElement;

const openPopUpAddUser = (open: boolean) => {
  if (open) {
    popUpAddUserEle?.classList.add("flex");
    popUpAddUserEle?.classList.remove("hidden");
  } else {
    popUpAddUserEle?.classList.add("hidden");
    popUpAddUserEle?.classList.remove("flex");
  }
};
btnPopUpAddUserEle?.addEventListener("click", () => {
  isOpenPopUpAddUser = true;
  openPopUpAddUser(isOpenPopUpAddUser);
});

btnCancelPopUpAddUserEle?.addEventListener("click", () => {
  isOpenPopUpAddUser = false;
  openPopUpAddUser(isOpenPopUpAddUser);
});

btnAddUser?.addEventListener("click", async () => {
  const firstName = firstNameAddEle.value.trim();
  const lastName = lastNameAddEle.value.trim();
  const email = emailAddEle.value.trim();
  const phone = phoneAddEle.value.trim();
  const gender = genderAddEle.value.trim();
  const birthDate = birthDateAddEle.value.trim();
  let dataToAdd: any;

  try {
    const res = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        gender,
        birthDate,
      }),
    });
    dataToAdd = await res.json();
    console.log("data to add", dataToAdd);
    isOpenPopUpAddUser = false;
    openPopUpAddUser(isOpenPopUpAddUser);
  } catch (error) {
    console.log(error);
  }

  const row = document.createElement("tr");
  row.classList.add(`table__tr${dataToAdd.id}`);
  row.innerHTML = `
        <td class="table__desc">${dataToAdd.id}</td>
        <td class="table__desc">${dataToAdd.lastName} ${
    dataToAdd.firstName
  }</td>
        <td class="table__desc">${dataToAdd.gender}</td>
        <td class="table__desc">${dataToAdd.email}</td>
        <td class="table__desc">${dataToAdd.phone}</td>
        <td class="table__desc">${dataToAdd.birthDate
          .split("-")
          .reverse()
          .join("/")}</td>
        <td class="table__desc table-todos">
        </td>
        <td class="table__desc text-center justify-center"><button id="js-openpopupdelete-${
          dataToAdd.id
        }" class="btn btn-delete"><i class="fa-solid fa-trash"></i></button></td>
        `;
  tableTitleEle.appendChild(row);

  console.log("userfinal", `table_tr${userFinal.id}`);
});

// SEARCH user

const inputEle = document.getElementById("js-search") as HTMLInputElement;
const btnSearchEle = document.getElementById("js-search-btn")!;

// call api for search

const getUserForSearch = async (q: string) => {
  try {
    const res = await fetch(`https://dummyjson.com/users/search?q=${q}`);
    const data = await res.json();
    if (data.users.length) {
      displayDataUser(data?.users);
    }
  } catch (error) {
    console.log(error);
  }
};

btnSearchEle.addEventListener("click", (e) => {
  e.preventDefault();
  const valueInput = inputEle.value.trim();

  console.log("value", valueInput.split(" ")[0]);
  getUserForSearch(valueInput.split(" ")[0]);
});

// DROPDOWN gender

const selectEle = document.getElementById(
  "js-filter-gender"
) as HTMLSelectElement;

const getUserForFilterGender = async (value: string) => {
  try {
    const res = await fetch(
      `https://dummyjson.com/users/filter?key=gender&value=${value}`
    );
    const data = await res.json();
    displayDataUser(data?.users);
  } catch (error) {
    console.log(error);
  }
};

selectEle.addEventListener("change", () => {
  console.log("value", selectEle.value);
  getUserForFilterGender(selectEle.value);
});

// pagination
