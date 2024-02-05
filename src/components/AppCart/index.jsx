import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Table,
  InputNumber,
  Button,
  Form,
  Input,
  Checkbox,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getCart } from "../../Api";
export default function AppCart() {
  const [CartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkOutDrawerOpen, setCheckOutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalOfCart, setTotalOfCart] = useState();
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);
  const onConfirmOrder = (values) => {
    console.log({ values });
    setCartDrawerOpen(false);
    setCheckOutDrawerOpen(false);
    message.success("Your Order has Been Placed");
  };

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={5}
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
          pagination={false}
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
            setTotalOfCart(
              data.reduce((pre, current) => {
                return pre + current.total;
              }, 0)
            );
          }}
        />
        <span className="total-cart">Total: ${totalOfCart}</span>
        <Button type="primary" onClick={() => setCheckOutDrawerOpen(true)}>
          Click here To Checkout
        </Button>
      </Drawer>
      <Drawer
        onClose={() => {
          setCheckOutDrawerOpen(false);
        }}
        open={checkOutDrawerOpen}
        title="CheckOut Item List"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter Your Full name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter your email address here" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
            label="Phone"
            name="phone"
          >
            <Input placeholder="Enter your phone Number here" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter your current address here" />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash On Delievery
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Typography.Paragraph type="secondary">
              Other Options Availabe Soon
            </Typography.Paragraph>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
