import { useState } from "react";
import { CartContext } from "./store/meal-cart-context";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Backdrop from "./components/Backdrop";

function App() {
  const [mealCart, setMealCart] = useState({
    items: [],
    show: false,
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
        ...prevCart.items.map((item) => {
          if (item.id === id) {
            item.qnt += 1;
            return item;
          }
          return item;
        }),
      ],
    }));
  }
  function handleDecreaseQuantity(id) {
    setMealCart((prevCart) => ({
      ...prevCart,
      items: [
        ...prevCart.items.map((item) => {
          if (item.id === id) {
            if (item.qnt > 0) {
              item.qnt -= 1;
              return item;
            }
            if (item.qnt === 0) {
              // Remove item
              setMealCart((prevCart) => ({
                ...prevCart,
                items: [...prevCart.items.filter((item) => item.id !== id)],
              }));
            }
          }
          return item;
        }),
      ],
    }));
  }

  function toggleCartModalVisibility(){
    setMealCart(prevCart => ({
      ...prevCart,
      show: !prevCart.show
    }))
  }
  const ctxValue = {
    items: mealCart.items,
    showCartModal: mealCart.show,
    addOrRemoveItemToCart: handleAddOrRemoveItem,
    encreaseMealQuantity: handleIncreaseQuantity,
    decreaseMealQuantity: handleDecreaseQuantity,
    showOrHideCartModal: toggleCartModalVisibility,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      <Backdrop/>
      <Cart />
      <Checkout/>
      <Header />
      <Meals />
    </CartContext.Provider>
  );
}

export default App;
