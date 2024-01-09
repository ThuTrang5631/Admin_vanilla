import "../../styles/_index.scss";
import { updateUser } from "./UpdateUser";
import { popUp } from "./PopUp";
import { deleteUser } from "./DeleteUser";
import { getApi, postApi } from "./api";
import { addUser } from "./AddUser";
import { getUserForFilterGender, getUserForSearch } from "./utils";

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
const btnClosePopUp = document.getElementsByClassName("js-btn-cancel");
const firstNameUpdateEle = document.getElementById(
  "js-first-name-update"
) as HTMLInputElement;
const lastNameUpdateEle = document.getElementById(
  "js-last-name-update"
) as HTMLInputElement;
const emailUpdateEle = document.getElementById(
  "js-email-update"
) as HTMLInputElement;
const phoneUpdateEle = document.getElementById(
  "js-phone-update"
) as HTMLInputElement;
const genderUpdateEle = document.getElementById(
  "js-gender-update"
) as HTMLInputElement;
const birthDateUpdateEle = document.getElementById(
  "js-date-update"
) as HTMLInputElement;
const btnUpdateUser = document.getElementById("js-updateuser");

const getDataUser = async () => {
  try {
    const data = await getApi(`/users?skip=${skip}&limit=${limit}`);
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
        <td class="table__desc" id="js-contain-${r.id}">${r.id}</td>
        <td class="table__desc" id="js-firstlastname-${r.id}">${r.lastName} ${
      r.firstName
    }</td>
        <td class="table__desc" id="js-gender-${r.id}">${r.gender}</td>
        <td class="table__desc" id="js-email-${r.id}">${r.email}</td>
        <td class="table__desc" id="js-phone-${r.id}">${r.phone}</td>
        <td class="table__desc" id="js-birthdate-${r.id}">${r.birthDate
      .split("-")
      .reverse()
      .join("/")}</td>
        <td class="table__desc table-todos">
        </td>
        <td class="table__desc text-center justify-center">
        <button id="js-openpopupdelete-${
          r.id
        }" class="btn btn-delete mr-[10px]"><i class="fa-solid fa-trash"></i></button>
        <button class="btn btn-delete" id="js-openpopupupdate-${r.id}">
          <i class="fas fa-edit"></i>
        </button></td>
        `;

    tableTitleEle.appendChild(row);

    // get to do of users follow id user
    let todosList;

    try {
      todosList = await getApi(`/users/${r.id}/todos`);
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

    // get element of button open pop up delete user
    const btnOpenPopUpDeleteEle = document.getElementById(
      `js-openpopupdelete-${r.id}`
    );

    btnOpenPopUpDeleteEle?.addEventListener("click", () => {
      // openPopUpDelete(true);
      popUp(true, popUpDeleteEle);

      const btnDeleteEle = document.getElementById("js-delete");

      // delete functions
      btnDeleteEle?.addEventListener("click", () => {
        deleteUser(r.id, popUpDeleteEle);
      });
    });

    // get element of button open pop up update user
    const btnOpenPopUpUpdateUserEle = document.getElementById(
      `js-openpopupupdate-${r.id}`
    );

    btnOpenPopUpUpdateUserEle?.addEventListener("click", (e) => {
      console.log("btnOpenPopUpUpdateUserEle", btnOpenPopUpUpdateUserEle);
      e.preventDefault();
      popUp(true, popUpUpdateUserEle);
      firstNameUpdateEle.value = r.firstName;
      lastNameUpdateEle.value = r.lastName;
      genderUpdateEle.value = r.gender;
      emailUpdateEle.value = r.email;
      phoneUpdateEle.value = r.phone;
      birthDateUpdateEle.value = r.birthDate;
      let dataToUpdate;

      const idUpdate = r.id;

      btnUpdateUser?.addEventListener("click", (e) => {
        e.preventDefault();

        popUp(false, popUpUpdateUserEle);
        if (
          firstNameUpdateEle.value !== r.firstName ||
          lastNameUpdateEle.value !== r.lastName ||
          genderUpdateEle.value !== r.gender ||
          emailUpdateEle.value !== r.email ||
          phoneUpdateEle.value !== r.phone ||
          birthDateUpdateEle.value !== r.birthDate
        ) {
          dataToUpdate = {
            firstName: firstNameUpdateEle.value,
            lastName: lastNameUpdateEle.value,
            email: emailUpdateEle.value,
            phone: phoneUpdateEle.value,
            gender: genderUpdateEle.value,
            birthDate: birthDateUpdateEle.value,
          };

          // BUG: CALL ID PREVIOUS, SHOULD CALL ID CURRENTLY => CALL MANY TIMES

          updateUser(dataToUpdate, idUpdate);
        }
      });
    });
  }
};

for (let i = 0; i < btnClosePopUp.length; i++) {
  btnClosePopUp[i].addEventListener("click", () => {
    popUp(false, popUpDeleteEle);
  });
}

// ADD USER
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

btnPopUpAddUserEle?.addEventListener("click", () => {
  popUp(true, popUpAddUserEle);
});

btnCancelPopUpAddUserEle?.addEventListener("click", (e) => {
  e.preventDefault();
  popUp(false, popUpAddUserEle);
});

btnAddUser?.addEventListener("click", async (e) => {
  e.preventDefault();
  const firstName = firstNameAddEle.value.trim();
  const lastName = lastNameAddEle.value.trim();
  const email = emailAddEle.value.trim();
  const phone = phoneAddEle.value.trim();
  const gender = genderAddEle.value.trim();
  const birthDate = birthDateAddEle.value.trim();

  addUser(
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    gender,
    popUpAddUserEle,
    tableTitleEle,
    popUpDeleteEle
  );
});

// UPDATE USER
const popUpUpdateUserEle = document.getElementById("js-popupupdateuser");
const btnCancelPopUpUpdateUserEle = document.getElementById(
  "js-btn-cancel-updateuser"
);

btnCancelPopUpUpdateUserEle?.addEventListener("click", (e) => {
  e.preventDefault();
  popUp(false, popUpUpdateUserEle);
});

// SEARCH user

const inputEle = document.getElementById("js-search") as HTMLInputElement;
const btnSearchEle = document.getElementById("js-search-btn")!;

btnSearchEle.addEventListener("click", (e) => {
  e.preventDefault();
  const valueInput = inputEle.value.trim();
  getUserForSearch(valueInput.split(" ")[0], displayDataUser);
});

// DROPDOWN gender

const selectEle = document.getElementById(
  "js-filter-gender"
) as HTMLSelectElement;

selectEle.addEventListener("change", () => {
  getUserForFilterGender(selectEle.value, displayDataUser);
});

// pagination
