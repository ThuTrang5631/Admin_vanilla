import { deleteApi } from "./api";
import { popUp } from "./PopUp";

// DELETE USER
export const deleteUser = async (
  id: number,
  popUpDeleteEle: HTMLElement | null
) => {
  try {
    const data = await deleteApi("/users/", id);
    console.log("data", data);

    if (data.isDeleted) {
      popUp(false, popUpDeleteEle);
      const elementDeleted = document.querySelector(`.table__tr${id}`);
      elementDeleted?.remove();
    }
  } catch (error) {
    console.log(error);
    window.alert("not delete");
  }
};
