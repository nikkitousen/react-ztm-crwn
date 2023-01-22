import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find((item) => item.id === itemToAdd.id);
  if (existingCartItem) {
    return cartItems.map((item) => (item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, itemToRemove, removeAll = false) => {
  const existingCartItem = cartItems.find((item) => item.id === itemToRemove.id);
  if (existingCartItem.quantity > 1 && !removeAll) {
    return cartItems.map((item) => (item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item));
  }
  return cartItems.filter((item) => item.id !== itemToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  itemsCount: 0,
  itemsTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [itemsTotalPrice, setItemsTotalPrice] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce((acum, item) => acum + item.quantity, 0);
    setItemsCount(newCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((acum, item) => acum + item.price * item.quantity, 0);
    setItemsTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
  const removeItemFromCart = (productToRemove, removeAll = false) =>
    setCartItems(removeCartItem(cartItems, productToRemove, removeAll));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    itemsCount,
    itemsTotalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
