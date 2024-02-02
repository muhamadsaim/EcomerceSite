import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Drawer, Table, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { getCart } from "../Api";
export default function AppCart() {
  const [CartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState();
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

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
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    defaultValue={value}
                    min={0}
                    onChange={(newValue) => {
                      setCartItems((prevCartItems) =>
                        prevCartItems.map((cart) => {
                          if (record.id === cart.id) {
                            cart.quantity = newValue;
                            cart.total = cart.price * newValue;
                          }
                          return cart;
                        })
                      );
                    }}
                  />
                );
              },
            },

            {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total: ${total}</span>;
          }}
        />
      </Drawer>
    </div>
  );
}
