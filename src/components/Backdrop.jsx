import { CartContext } from "../store/meal-cart-context";
import { use } from "react";
export default function Backdrop(){
    const {
    showCartModal,
  } = use(CartContext);

    return <>
        {showCartModal && <div className="backdrop"></div> }
    </>
}