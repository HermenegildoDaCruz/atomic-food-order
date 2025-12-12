import { useState } from "react";
import { CartContext } from "./store/meal-cart-context";
import Header from "./components/Header";
import Meals from "./components/Meals";
function App() {
  const [mealCart, setMealCart] = useState({
    items: [],
  });

  function handleAddOrRemoveItem(mealId, mealName, mealPrice) {
    const itemAlreadyExists =
      mealCart.items.filter((item) => item.id === mealId).length > 0
        ? true
        : false;
    if (!itemAlreadyExists) {
      setMealCart((prevCart) => ({
        ...prevCart,
        items: [
          ...prevCart.items,
          {
            id: mealId,
            name: mealName,
            price: mealPrice,
            qnt: 1,
          },
        ],
      }));
    } else {
      // Remove item
      setMealCart((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items.filter((item) => item.id !== mealId)],
      }));
    }
  }

  function handleIncreaseQuantity(id) {
    setMealCart((prevCart) => ({
      ...prevCart,
      items: [
        ...prevCart.items.map((item) =>
          item.id === id ? (item.qnt += 1) : item
        ),
      ],
    }));
  }

  function handleDecreaseQuantity(id) {
    setMealCart((prevCart) => ({
      ...prevCart,
      items: [
        ...prevCart.items.map((item) => {
          if (item.id === id) {
            if (item.qnt > -1) {
              item.qnt -= 1;
              return item;
            }
          }
          return item;
        }),
      ],
    }));
  }

  const ctxValue = {
    items: mealCart.items,
    addOrRemoveItemToCart: handleAddOrRemoveItem,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      <Header />
      <Meals />
    </CartContext.Provider>
  );
}

export default App;
