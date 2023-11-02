import "../styles/_index.scss";

interface UserProps {
  id: number;
  fullName: string;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
}

const tableDataEle = document.getElementById("js-table")!;

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

console.log("tableDataEle", tableDataEle);

window.addEventListener("load", getDataUser);

const displayDataUser = (data: any) => {
  let dataAppendTable = `
  <tr class="table__row" id="js-table-title">
    <th class="table__title">Id</th>
    <th class="table__title">Full name</th>
    <th class="table__title">Gender</th>
    <th class="table__title">Email</th>
    <th class="table__title">Phone</th>
    <th class="table__title">Birth date</th>
    <th class="table__title">Todo</th>
  </tr>`;

  for (let r of data) {
    dataAppendTable += `
      <tr class="table__row" id="js-table-data">
        <td class="table__desc">${r.id}</td>
        <td class="table__desc">${r.lastName} ${r.firstName}</td>
        <td class="table__desc">${r.gender}</td>
        <td class="table__desc">${r.email}</td>
        <td class="table__desc">${r.phone}</td>
        <td class="table__desc">${r.birthDate}</td>
      </tr>
        `;
  }
  tableDataEle.innerHTML = dataAppendTable;
};
