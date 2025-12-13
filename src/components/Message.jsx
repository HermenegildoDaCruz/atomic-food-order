import { CartContext } from "../store/meal-cart-context";
import { use, useEffect } from "react";
export default function Message({ text }) {
  const { showCheckoutMessage, closeCheckoutMessage } = use(CartContext);

  useEffect(() => {
    if (showCheckoutMessage) {
      const timer = setTimeout(() => {
        closeCheckoutMessage();
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [showCheckoutMessage, closeCheckoutMessage]);
  return (
    <dialog open={showCheckoutMessage} className="modal message">
      <p>{text}</p>
      <button className="btn btn--primary" onClick={closeCheckoutMessage}>close</button>
    </dialog>
  );
}
