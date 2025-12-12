import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  addOrRemoveItemToCart: () => {},
  encreaseMealQuantity: () => {},
  decreaseMealQuantity: () => {},
  showOrHideCartModal: () => {}
});
