import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [productList, setProductList] = useState([]);
  // 유즈서치파람은 쿼리값찾아오는거
  const [query, setQuery] = useSearchParams();

  const getProducts = async () => {
    // q라는 키값을 가진 쿼리를 찾아서 서치쿼리 안에넣어주셈 || 없으면 빈 문자열
    let searchQuery = query.get("q") || "";
    // ?뒷부분 제이슨서버 문법 - 쿼리값으로 알아서 찾아옴
    const url = `http://localhost:3000/products?q=${searchQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, [query]);
  return (
    <Container>
      <Row className="justify-content-center">
        {productList.map((menu, index) => (
          <Col className="mb-4" key={index} xs={12} sm={6} md={4} lg={3}>
            <ProductCard item={menu} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
