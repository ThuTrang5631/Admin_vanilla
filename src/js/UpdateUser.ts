import { putApi } from "./api";

// UPDATE USER
export const updateUser = async (dataToUpdate: any, id: number) => {
  console.log("dataToUpdate", dataToUpdate);
  console.log("idUpdate", id);
  try {
    const dataUpdateSucess = await putApi("/users/", id, dataToUpdate);
    const firstNameEle = document.getElementById(`js-firstlastname-${id}`)!;
    const emailEle = document.getElementById(`js-email-${id}`)!;
    const phoneEle = document.getElementById(`js-phone-${id}`)!;
    const birthDateEle = document.getElementById(`js-birthdate-${id}`)!;
    firstNameEle.innerHTML = `${dataUpdateSucess.lastName} ${dataUpdateSucess.firstName}`;
    emailEle.innerHTML = dataUpdateSucess.email;
    phoneEle.innerHTML = dataUpdateSucess.phone;
    birthDateEle.innerHTML = dataUpdateSucess.birthDate;

    console.log("dataUpdateSucess", dataUpdateSucess);
  } catch (error) {
    console.log(error);
  }
};
