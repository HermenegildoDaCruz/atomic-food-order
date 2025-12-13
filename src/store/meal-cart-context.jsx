import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  showCartModal: false,
  addOrRemoveItemToCart: () => {},
  encreaseMealQuantity: () => {},
  decreaseMealQuantity: () => {},
  showOrHideCartModal: () => {},
  showCheckoutModal: false,
  showCheckoutMessage: false,
  goToCheckout: () => {},
  closeCheckout: () => {},
  closeCheckoutMessage: () => {},
  sucessfulCheckout: () => {}
});
