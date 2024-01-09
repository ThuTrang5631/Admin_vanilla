// // open popup delete
// export const openPopUpDelete = (
//   openDelete = false,
//   popUpDeleteEle: HTMLElement | null
// ) => {
//   if (openDelete) {
//     popUpDeleteEle?.classList.remove("hidden");
//     popUpDeleteEle?.classList.add("flex");
//   } else {
//     popUpDeleteEle?.classList.add("hidden");
//     popUpDeleteEle?.classList.remove("flex");
//   }
// };
// // open popup update

// export const openPopUpUpdateUser = (
//   openPopUpUpdate = false,
//   popUpUpdateUserEle: HTMLElement | null
// ) => {
//   if (openPopUpUpdate) {
//     popUpUpdateUserEle?.classList.add("flex");
//     popUpUpdateUserEle?.classList.remove("hidden");
//   } else {
//     popUpUpdateUserEle?.classList.add("hidden");
//     popUpUpdateUserEle?.classList.remove("flex");
//   }
// };

// // open popup add

// export const openPopUpAddUser = (
//   open = false,
//   popUpAddUserEle: HTMLElement | null
// ) => {
//   if (open) {
//     popUpAddUserEle?.classList.add("flex");
//     popUpAddUserEle?.classList.remove("hidden");
//   } else {
//     popUpAddUserEle?.classList.add("hidden");
//     popUpAddUserEle?.classList.remove("flex");
//   }
// };

export const popUp = (open = false, popUpEle: HTMLElement | null) => {
  if (open) {
    popUpEle?.classList.add("flex");
    popUpEle?.classList.remove("hidden");
  } else {
    popUpEle?.classList.add("hidden");
    popUpEle?.classList.remove("flex");
  }
};
