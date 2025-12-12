import heroImage from "../assets/hero.png";
import logo from "../assets/logo.jpg";
import { CartContext } from "../store/meal-cart-context";
import { use } from "react";

export default function Header() {
  const { items } = use(CartContext);
  return (
    <header className="header">
      <nav className="main-nav">
        <div className="logo">
          <img src={logo} alt="App logo" />
          <span>AtomicFood.</span>
        </div>
        <button type="button" className="cart-btn">
          <ion-icon name="cart" className="icon"></ion-icon>
          {items.length > 0 && <span className="">{items.length}</span>}
        </button>
      </nav>
      <div className="hero">
        <div className="hero-text-box">
          <h1>🍔 FastOrder — Food delivered the right way</h1>
          <p>
            Order your favorite meals in just a few clicks. Fast delivery,
            trusted restaurants, and a smooth experience from start to finish.
          </p>
          <button type="button" className="btn btn--primary">
            Explore Foods
          </button>
        </div>
        <img src={heroImage} alt="Meals" className="hero-img" />
      </div>
    </header>
  );
}
