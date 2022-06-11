import "./App.css";
import Home from "./home";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <>
      <CartProvider>
        <Home />
      </CartProvider>
    </>
  );
}

export default App;
