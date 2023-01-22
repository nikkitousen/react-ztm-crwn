import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ checkoutItem }) => {
  const { name, imageUrl, price, quantity } = checkoutItem;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  const addOneHandler = () => addItemToCart(checkoutItem);
  const removeOneHandler = () => removeItemFromCart(checkoutItem);
  const removeAllHandler = () => removeItemFromCart(checkoutItem, true);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeOneHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addOneHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeAllHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
