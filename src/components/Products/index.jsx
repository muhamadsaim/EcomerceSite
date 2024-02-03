/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { getAllProducts, getProductByCategory } from "../../Api";
import { Badge, Card, Image, List, Rate, Spin, Typography } from "antd";
import AddtoCartButton from "../AddToCartButton";
import { useParams } from "react-router-dom";

export const Products = () => {
  const param = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    (param.catrgoryId
      ? getProductByCategory(param.catrgoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);
  if (loading) return <Spin spinning />;
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
