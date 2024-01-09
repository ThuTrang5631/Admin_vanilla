export const popUp = (open = false, popUpEle: HTMLElement | null) => {
  if (open) {
    popUpEle?.classList.add("flex");
    popUpEle?.classList.remove("hidden");
  } else {
    popUpEle?.classList.add("hidden");
    popUpEle?.classList.remove("flex");
  }
};
