import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart data from AsyncStorage when the component mounts
    const loadCartData = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart !== null) {
          setCart(JSON.parse(savedCart));
          console.log(cart)
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, []); 

  const updateCartData = async (newCart) => {
      console.log('updatedCart', newCart)
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };


  const addToCart = (product, quantity = 1) => {
      console.log('addToCart...'), product
    const existingItem = cart.find(item => item._id === product._id);
  if (existingItem) {
    // If the product already exists in the cart, update its quantity
    const updatedItem = { ...existingItem, quantity: existingItem.quantity + quantity };
    const updatedCart = cart.map(item => (item._id === product._id ? updatedItem : item));
      setCart(updatedCart);
      updateCartData(updatedCart);
  } else {
    // If the product is not already in the cart, add it
    const newItem = { ...product, quantity };
    const updatedCart = [...cart, newItem]
    setCart(updatedCart);
    updateCartData(updatedCart);

  }

  };

  const removeFromCart = (productId) => {
    console.log('inside removeFromCart...', productId)
    const updatedCart = cart.filter(item => item._id !== productId)
    setCart(updatedCart);
    updateCartData(updatedCart);
  };

  const incrementQuantity = (productId) => {
    console.log('inside incrementQuantity...', productId)
    const existingItem = cart.find(item => item._id === productId);
    if (existingItem) {
      // If the product already exists in the cart, update its quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      const updatedCart = cart.map(item => (item._id === productId ? updatedItem : item))
      setCart(updatedCart);
      updateCartData(updatedCart)
    } 
    else{
        console.log("product does not exist")
    }
  }

  const decrementQuantity = (productId) => {
    console.log('inside decrementQuantity...', productId)
    const existingItem = cart.find(item => item._id === productId);
    if (existingItem) {
      // If the product already exists in the cart, update its quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      const updatedCart = cart.map(item => (item._id === productId ? updatedItem : item))
      setCart(updatedCart);
      updateCartData(updatedCart)
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
