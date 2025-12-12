import { CartContext } from "../store/meal-cart-context";
import { use } from "react";

export default function Cart({open}) {
  const { items } = use(CartContext);
  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.qnt;
  });
  return (
    <dialog open={open} className="modal cart">
      <h2>Cart</h2>
      <ul>
        {items.length > 0 ? items.map((item) => {
          return (
            <li className="cart-item">
              <span style={{fontWeight:"700"}}>{item.name}</span>
              <form> 
                <button>+</button>
                  {item.qnt} 
                <button>-</button>
              </form>
              <span> ${item.price * item.qnt} </span>
            </li>
          );
        }): <p>Your cart is empty</p>}
      </ul>
      
        <p className="cart-total">total: {totalAmount}$</p>
        <form className="cart-item-actions">
            <button className="btn btn--primary">checkout</button>
            <button className="btn">close</button>
        </form>
    </dialog>
  );
}
