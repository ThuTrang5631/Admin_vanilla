import { getApi } from "./api";

export const URL = "https://dummyjson.com";

export const getUserForFilterGender = async (
  value: string,
  displayDataUser: Function
) => {
  try {
    const data = await getApi(`/users/filter?key=gender&value=${value}`);
    displayDataUser(data?.users);
  } catch (error) {
    console.log(error);
  }
};

export const getUserForSearch = async (
  q: string,
  displayDataUser: Function
) => {
  try {
    const data = await getApi(`/users/search?q=${q}`);
    if (data.users.length) {
      displayDataUser(data?.users);
    } else {
      window.alert("No find user");
    }
  } catch (error) {
    console.log(error);
  }
};
