import React, { useContext } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../App';
import "./Product.css";

const Products = () => {
  const [product, setProduct] = useContext(ProductContext);
  setProduct(product);

  return (
    <Row className="justify-content-center">
      {
        product.length === 0 && <div>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
        </div>
      }
      {
        product.map(pd =>
          <Col key={pd._id} lg={4} sm={12} className="my-3 text-center">
            <Card className="product-card p-2">
              <Card.Img src={pd.productImage} className="img-fluid" />
              <Card.Body>
                <Card.Title>{pd.productName}</Card.Title>
                <h6>Price: {pd.productPrice}</h6>
                <Link to={`cart/${pd._id}`} className="btn btn-primary mt-3">Buy Now</Link>
              </Card.Body>
            </Card>
          </Col>
        )
      }
    </Row>
  );
};

export default Products;