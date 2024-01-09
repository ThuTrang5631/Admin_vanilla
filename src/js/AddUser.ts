import { popUp } from "./PopUp";
import { postApi } from "./api";

export const addUser = async (
  firstName: any,
  lastName: any,
  email: any,
  phone: any,
  birthDate: any,
  gender: any,
  popUpAddUserEle: HTMLElement | null,
  tableTitleEle: HTMLElement,
  popUpDeleteEle: HTMLElement | null
) => {
  let dataToAdd: any;
  if (!firstName || !lastName || !email || !phone || !birthDate) {
    window.alert("enter field again");
  } else {
    const data = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      birthDate,
    };
    try {
      dataToAdd = await postApi(`/users/add`, data);
      console.log("data to add", dataToAdd);
      popUp(false, popUpAddUserEle);
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
      popUp(true, popUpDeleteEle);

      const btnDeleteEle = document.getElementById("js-delete");

      // delete functions
      btnDeleteEle?.addEventListener("click", () => {
        popUp(false, popUpDeleteEle);
        const elementDeleted = document.querySelector(
          `.table__tr${dataToAdd.id}`
        );
        elementDeleted?.remove();
      });
    });
  }
};
