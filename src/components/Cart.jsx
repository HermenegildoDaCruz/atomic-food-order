import { CartContext } from "../store/meal-cart-context";
import { use } from "react";

export default function Cart() {
  const {
    items,
    encreaseMealQuantity,
    decreaseMealQuantity,
    showCartModal,
    showOrHideCartModal,
    goToCheckout
  } = use(CartContext);

  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.qnt;
  });

  return (
    <dialog open={showCartModal} className="modal cart">
      <h2>Cart</h2>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="cart-item">
              <span style={{ fontWeight: "700" }}>{item.name}</span>
              <div>
                <button onClick={() => encreaseMealQuantity(item.id)}>+</button>
                {item.qnt}
                <button onClick={() => decreaseMealQuantity(item.id)}>-</button>
              </div>
              <span> ${(item.price * item.qnt).toFixed(2)} </span>
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>

      {items.length > 0 && <p className="cart-total">total: {totalAmount.toFixed(2)}$</p>}
      <div className="cart-item-actions">
        <button className = {items.length === 0 ? "disable btn btn--primary":"btn btn--primary"} onClick={goToCheckout}>go to checkout</button>
        <button className="btn" onClick={showOrHideCartModal}>
          close
        </button>
      </div>
    </dialog>
  );
}
