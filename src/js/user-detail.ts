import "../../styles/_index.scss";
import { getApi } from "./api";

const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");
console.log("id", id);

const getDataForDetail = async () => {
  try {
    const res = await getApi(`/users/${id}`);
    displayData(res);
    console.log("res", res);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getDataForDetail);

const displayData = (data: any) => {
  const imageDetailEle = document.getElementById("js-image") as HTMLElement;
  const firstNameDetailEle = document.getElementById(
    "js-first-name"
  ) as HTMLElement;
  const lastNameDetailEle = document.getElementById(
    "js-last-name"
  ) as HTMLElement;
  const ageDetailEle = document.getElementById("js-age") as HTMLElement;
  const genderDetailEle = document.getElementById("js-gender") as HTMLElement;
  const emailDetailEle = document.getElementById("js-email") as HTMLElement;
  const phoneDetailEle = document.getElementById("js-phone") as HTMLElement;
  const birthDateDetailEle = document.getElementById(
    "js-birth-date"
  ) as HTMLElement;
  const addressDetailEle = document.getElementById("js-address") as HTMLElement;
  const companyDetailEle = document.getElementById("js-company") as HTMLElement;
  const companyTitleDetailEle = document.getElementById(
    "js-company-title"
  ) as HTMLElement;
  const companyDepartmentDetailEle = document.getElementById(
    "js-company-department"
  ) as HTMLElement;

  imageDetailEle.setAttribute("src", data.image);
  firstNameDetailEle.textContent = data.firstName;
  lastNameDetailEle.textContent = data.lastName;
  ageDetailEle.textContent = data.age;
  genderDetailEle.textContent = data.gender;
  emailDetailEle.textContent = data.email;
  phoneDetailEle.textContent = data.phone;
  birthDateDetailEle.textContent = data.birthDate;
  addressDetailEle.textContent = `${data.address.address} ${data.address.city}`;
  companyDetailEle.textContent = data.company.name;
  companyTitleDetailEle.textContent = data.company.title;
  companyDepartmentDetailEle.textContent = data.company.department;
};
