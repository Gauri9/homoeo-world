import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    console.log('inside addToCart...', product)
    const existingItem = cart.find(item => item.id === product._id);
    if (!existingItem) {
     // If the product is not already in the cart, add it
     const newItem = { ...product, quantity };
     setCart([...cart, newItem]);
    } 
  };

  const removeFromCart = (productId) => {
    console.log('inside removeFromCart...', productId)
    setCart(cart.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    console.log('inside incrementQuantity...', productId)
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      // If the product already exists in the cart, update its quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      setCart(cart.map(item => (item.id === productId ? updatedItem : item)));
    } 
    else{
        console.log("product does not exist")
    }
  }

  const decrementQuantity = (productId) => {
    console.log('inside decrementQuantity...', productId)
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      // If the product already exists in the cart, update its quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      setCart(cart.map(item => (item.id === productId ? updatedItem : item)));
    } 
    else{
        console.log("product does not exist")
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
