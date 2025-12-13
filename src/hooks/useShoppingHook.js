import { useState } from "react";

export default function useShoppingHook() {
  const [mealCart, setMealCart] = useState({
    items: [],
    show: false,
  });

  const [checkoutState, setCheckoutState] = useState({
    success: false,
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

  function toggleCartModalVisibility() {
    setMealCart((prevCart) => ({
      ...prevCart,
      show: !prevCart.show,
    }));
  }

  function goToCheckout() {
    setMealCart((prevCart) => ({
      ...prevCart,
      show: false,
    }));
    setCheckoutState({
      show: true,
    });
  }

  function closeCheckout() {
    setCheckoutState({
      show: false,
    });
  }

  function closeCheckoutMessage() {
    setCheckoutState({
      success: false,
    });
  }

  function sucessfulCheckout() {
    setCheckoutState({
      success: true,
      show: false,
    });
    setMealCart({
      items: [],
      show: false,
    });
  }

  const ctxValue = {
    items: mealCart.items,
    showCartModal: mealCart.show,
    addOrRemoveItemToCart: handleAddOrRemoveItem,
    encreaseMealQuantity: handleIncreaseQuantity,
    decreaseMealQuantity: handleDecreaseQuantity,
    showOrHideCartModal: toggleCartModalVisibility,
    showCheckoutModal: checkoutState.show,
    goToCheckout: goToCheckout,
    closeCheckout: closeCheckout,
    closeCheckoutMessage: closeCheckoutMessage,
    sucessfulCheckout: sucessfulCheckout,
    showCheckoutMessage: checkoutState.success,
  };
  return ctxValue;
}
