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
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };


  const addToCart = (product, selectedSubcategory) => {
    console.log('selectedSubcategory...', selectedSubcategory)
    const existingItem = cart.find(item => item._id === product._id);
    const newItem = (existingItem) ? { ...existingItem } : { ...product }  
      if(newItem.subcategories){
        const newSubcategories = newItem.subcategories.map(subcat => (subcat == selectedSubcategory)? {...subcat, quantity:1} : {...subcat, quantity: subcat.quantity || 0})
        const updatedItem = {...newItem, subcategories: newSubcategories}
        console.log('updatedItem.subcategories', updatedItem.subcategories)
        const updatedCart =   (existingItem) ? cart.map(item => (item._id === product._id ? updatedItem : item)) : [...cart, updatedItem]
        setCart(updatedCart);
        updateCartData(updatedCart);
      }
  };

  const removeFromCart = (productId, subcategory) => {
    console.log('inside removeFromCart...', productId)
    console.log('subcategory', subcategory)
    const itemTobeRemoved = cart.find(item => item._id === productId);
    console.log(itemTobeRemoved.subcategories)
    const newSubcategories = itemTobeRemoved.subcategories.map(subcat => (subcat === subcategory)? {...subcat, quantity:0} : {...subcat, quantity: subcat.quantity})
    console.log(newSubcategories)
    const updatedItem = {...newItem, subcategories: newSubcategories}
    console.log('updatedItem', updatedItem)
    const updatedCart =   cart.map(item => (item._id === productId ? updatedItem : item))
    // const updatedCart = cart.filter(item => item._id !== product._id)
    setCart(updatedCart);
    updateCartData(updatedCart);
  };

  const incrementQuantity = (product, selectedSubcategory) => {
    const existingItem = cart.find(item => item._id === product._id);
    const newItem = { ...product };
    if (existingItem) {
      if(product.subcategories){
        const newSubcategories = product.subcategories.map(subcat => (subcat === selectedSubcategory)? {...subcat, quantity:selectedSubcategory.quantity+1} : {...subcat})
        const updatedItem = {...newItem, subcategories: newSubcategories}
        const updatedCart = cart.map(item => (item._id === product._id ? updatedItem : item))
        setCart(updatedCart);
        updateCartData(updatedCart);
      }
    } 
    else{
        console.log("product does not exist")
    }
  }

  const decrementQuantity = (product, selectedSubcategory) => {
    const existingItem = cart.find(item => item._id === product._id);
    const newItem = { ...product };
    if (existingItem) {
      if(product.subcategories){
        const newSubcategories = product.subcategories.map(subcat => (subcat === selectedSubcategory)? {...subcat, quantity:selectedSubcategory.quantity-1} : {...subcat})
        const updatedItem = {...newItem, subcategories: newSubcategories}
        const updatedCart = cart.map(item => (item._id === product._id ? updatedItem : item))
        setCart(updatedCart);
        updateCartData(updatedCart);
      }
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
