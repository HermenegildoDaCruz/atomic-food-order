import { CartContext } from "../store/meal-cart-context";
import { use } from "react";
import { useActionState } from "react";
import { isEmpty, isNotEmail } from "../util/validators";
import { submitOrder } from "../util/submitOrder";

export default function Checkout() {
  const { items } = use(CartContext);

  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.qnt;
  });

  async function checkoutAction(prevFormState, formData) {
    const customer = Object.fromEntries(formData.entries());

    let errors = [];

    if (
      isEmpty(customer.name) ||
      isEmpty(customer.email) ||
      isEmpty(customer["postal-code"]) ||
      isEmpty(customer.city)
    ) {
      errors.push("Please fill all fields")
      return {errors}
    }

    if (isNotEmail(customer.email)){
      errors.push("Digit a valid email")
      return {errors}
    }

    await submitOrder({
      order: {
        items: items,
        customer: customer,
        total: totalAmount,
      }
    })
    

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, {
    errors: null,
  });
  
  return (
    <dialog open={true} className="checkout-form modal">
      <h2>Checkout</h2>
      <span>
        Total: <strong>{totalAmount}$</strong>
      </span>
      <form action={formAction}>
        <p className="control">
          <label htmlFor="iname">Your name</label>
          <input type="text" name="name" id="iname" maxLength={20} required />
        </p>
        <p className="control">
          <label htmlFor="iemal">Your email</label>
          <input type="email" name="email" id="iemal" required />
        </p>
        <div className="control-row">
          <p className="control">
            <label htmlFor="ipostal-code">Postal code</label>
            <input type="text" name="postal-code" id="ipostal-code" required />
          </p>
          <p className="control">
            <label htmlFor="icity">Your city</label>
            <input
              type="text"
              name="city"
              id="icity"
              minLength={2}
              maxLength={10}
              required
            />
          </p>
        </div>
        {formState.errors && (
          <div className="control error">
            {formState.errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="modal-actions">
          <button type="submit" className="btn btn--primary">
            {pending ? "Sending...":"Checkout"}
          </button>
          <button type="reset" className="btn">
            reset
          </button>
        </div>
      </form>
    </dialog>
  );
}
