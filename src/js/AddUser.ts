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
import { openPopUpDelete } from "./PopUp";

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

const openPopUpAddUser = (open = false) => {
  if (open) {
    popUpAddUserEle?.classList.add("flex");
    popUpAddUserEle?.classList.remove("hidden");
  } else {
    popUpAddUserEle?.classList.add("hidden");
    popUpAddUserEle?.classList.remove("flex");
  }
};
btnPopUpAddUserEle?.addEventListener("click", () => {
  openPopUpAddUser(true);
});

btnCancelPopUpAddUserEle?.addEventListener("click", (e) => {
  e.preventDefault();
  openPopUpAddUser(false);
});

btnAddUser?.addEventListener("click", async (e) => {
  e.preventDefault();
  const firstName = firstNameAddEle.value.trim();
  const lastName = lastNameAddEle.value.trim();
  const email = emailAddEle.value.trim();
  const phone = phoneAddEle.value.trim();
  const gender = genderAddEle.value.trim();
  const birthDate = birthDateAddEle.value.trim();
  let dataToAdd: any;

  if (!firstName || !lastName || !email || !phone || !birthDate) {
    window.alert("enter field again");
  } else {
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
      openPopUpAddUser();
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

    const btnOpenPopUpDeleteEle = document.getElementById(
      `js-openpopupdelete-${dataToAdd.id}`
    );

    btnOpenPopUpDeleteEle?.addEventListener("click", () => {
      openPopUpDelete(true, popUpDeleteEle);

      const btnDeleteEle = document.getElementById("js-delete");

      // delete functions
      btnDeleteEle?.addEventListener("click", () => {
        openPopUpDelete(false, popUpDeleteEle);
        const elementDeleted = document.querySelector(
          `.table__tr${dataToAdd.id}`
        );
        elementDeleted?.remove();
      });
    });
  }
});
