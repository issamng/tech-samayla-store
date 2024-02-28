import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  //local storage
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
  
      if (pos !== -1) {
        
        const updatedCart = prev.filter((value, index) => index !== pos);
  
        // Remove local storage when user remove all products from cart 
        if (updatedCart.length === 0) {
          ls.removeItem("cart");
        // Or keep the current state 
        } else {
          ls.setItem("cart", JSON.stringify(updatedCart));
        }
  
        return updatedCart;
      }
  
      return prev;
    });
  }
  
  
  function clearCart() {
    console.log("Clearing cart...");
    setCartProducts([]);
    ls.removeItem("cart");
    console.log("Cart cleared:", cartProducts);
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
