import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Drawer } from "antd";
import { useState } from "react";
export default function AppCart() {
  const [CartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={2}
        className="cart-icon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        open={CartDrawerOpen}
      ></Drawer>
    </div>
  );
}
