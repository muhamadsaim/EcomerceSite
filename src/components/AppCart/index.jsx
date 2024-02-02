import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Drawer, Table } from "antd";
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
        title="Your Shoppings"
      >
        <Table
          columns={[
            {
              title: "title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
            },
            {
              title: "Total",
              dataIndex: "total",
            },
          ]}
        />
      </Drawer>
    </div>
  );
}
