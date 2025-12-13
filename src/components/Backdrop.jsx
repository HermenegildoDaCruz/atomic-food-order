import { CartContext } from "../store/meal-cart-context";
import { use } from "react";
export default function Backdrop(){
    const {
    showCartModal,
    showCheckoutModal,
    showCheckoutMessage
  } = use(CartContext);

    return <>
        {(showCartModal || showCheckoutModal || showCheckoutMessage) && <div className="backdrop"></div> }
    </>
}