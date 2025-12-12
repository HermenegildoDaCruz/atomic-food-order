import { CartContext } from "../store/meal-cart-context";
import { motion } from "motion/react";
import { use } from "react";
export default function MealItem({ id, image, name, price, description }) {
  const { items, addOrRemoveItemToCart } = use(CartContext);
  const itemIsInCart =
    items.filter((item) => item.id === id).length > 0 ? true : false;
  return (
    <motion.div 
    initial={{ opacity: 0 , transform: "scale(0.5)"}}
    whileInView={{ opacity: 1, transform: "scale(1)"}}
    transition={{ duration: 0.4 }}
    className="meal-item">
      <img src={"http://localhost:3000/" + image} alt={name} />

      <p>{name}</p>
      <p className="meal-item-price">{price}$</p>
      <p className="meal-item-description">{description}</p>

      <div className="meal-item-actions">
        <button
          className="btn btn--primary"
          onClick={() => addOrRemoveItemToCart(id, name, price)}
        >
          {itemIsInCart ? "In cart" : "add to cart"}
        </button>
      </div>
    </motion.div>
  );
}
