import { CartContext } from "./store/meal-cart-context";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Backdrop from "./components/Backdrop";
import Message from "./components/Message";
import useShoppingHook from "./hooks/useShoppingHook";

function App() {
  const ctxValue = useShoppingHook();
  return (
    <CartContext.Provider value={ctxValue}>
      <Backdrop/>
      <Cart />
      <Checkout/>
      <Message text={"Your ask was submitted. We'll send a message."}/>
      <Header />
      <Meals />
    </CartContext.Provider>
  );
}

export default App;
