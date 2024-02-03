/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, message } from "antd";
import { addToCart } from "../../Api";

export default function AddtoCartButton({ item }) {
  const [loading, setLoading] = useState(false);
  const addItemsToCart = () => {
    setLoading(true);
    addToCart(item.id).then(() => {
      message.success(`${item.title} has been added to cart`);
      setLoading(false);
    });
  };
  return (
    <Button
      loading={loading}
      className="add-button"
      onClick={() => {
        addItemsToCart();
      }}
      type="link"
    >
      Add to Cart
    </Button>
  );
}
