import { URL } from "./constant";

export const getApi = async (endpoint: string, params: any) => {
  let data;
  try {
    const res = await fetch(`${URL}${endpoint}${params}`);
    data = res.json();
  } catch (error) {
    console.log(error);
  }

  return data;
};

export const putApt = async (
  endpoint: string,
  param: number,
  dataToUpdate: any
) => {
  let data;
  try {
    const res = await fetch(`${URL}${endpoint}${param}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToUpdate),
    });
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const postApi = async (endpoint: string, dataToPost: any) => {
  let data;
  try {
    const res = await fetch(`${URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToPost),
    });
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const deleteApi = async (endpoint: string, params: number) => {
  let data;
  try {
    const res = await fetch(`${endpoint}${params}`, {
      method: "DELETE",
    });
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  return data;
};
