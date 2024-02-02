/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { getAllProducts } from "../Api";
import { Badge, Card, Image, List, Rate, Typography } from "antd";
import AddtoCartButton from "../AddToCartButton";

export const Products = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  }, []);
  return (
    <div>
      <List
        grid={{ Column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="card-badge"
              text={product.discountPercentage}
              color="pink"
            >
              <Card
                className="card"
                title={product.title}
                key={index}
                cover={
                  <Image className="card-image" src={product.thumbnail}></Image>
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddtoCartButton item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "More" }}
                    >
                      {" "}
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
};
