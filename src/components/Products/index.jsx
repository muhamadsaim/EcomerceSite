/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { getAllProducts, getProductByCategory } from "../../Api";
import { Badge, Card, Image, List, Rate, Typography, Select } from "antd";
import AddtoCartButton from "../AddToCartButton";
import { useParams } from "react-router-dom";

export const Products = () => {
  const param = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("az");

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
  //   if (loading) return <Spin spinning />;
  const getSortedItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      const aLowerCaseTitle = a.title.toLowerCase();
      const bLowerCaseTitle = b.title.toLowerCase();

      switch (sortOrder) {
        case "az":
          return aLowerCaseTitle > bLowerCaseTitle
            ? 1
            : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
        case "za":
          return aLowerCaseTitle < bLowerCaseTitle
            ? 1
            : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
        case "lowHigh":
          return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
        case "highLow":
          return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
        default:
          // Handle default case or throw an error if needed
          break;
      }
    });
    return sortedItems;
  };

  return (
    <div className="product-main-div">
      <div>
        <Typography.Text>View Items Sorted By: </Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          defaultValue={"az"}
          options={[
            {
              label: "Alphabetically a-z",
              value: "az",
            },
            {
              label: "Alphabetically z-a",
              value: "za",
            },
            {
              label: "Price Low to High",
              value: "lowHigh",
            },
            {
              label: "Price High to Low",
              value: "highLow",
            },
          ]}
        ></Select>
      </div>
      <List
        loading={loading}
        grid={{ Column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="card-badge"
              text={`${product.discountPercentage}% OFF`}
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
        dataSource={getSortedItems()}
      ></List>
    </div>
  );
};
