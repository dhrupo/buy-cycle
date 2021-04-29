import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { HashRouter, Link, Route } from 'react-router-dom';
import "./AdminMenu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCube, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import ManageProduct from '../ManageProduct/ManageProduct';
import EditProduct from '../EditProduct/EditProduct';
import AddProduct from '../AddProduct/AddProduct';
import ManageOrder from '../ManageOrder/ManageOrder';

const AdminMenu = () => {
  return (
    <Container fluid>
      <HashRouter>
        <Row>
          <Col md={3} className="flex-column admin-menu">
            <Link to="/manageProduct" className="p-3 mb-2 nav-link"><FontAwesomeIcon icon={faCube} />&nbsp; Manage Product</Link>
            <Link to="/manageOrder" className="p-3 mb-2 nav-link"><FontAwesomeIcon icon={faBoxOpen} />&nbsp; Manage Orders</Link>
            <Link to="/addProduct" className="p-3 mb-2 nav-link"><FontAwesomeIcon icon={faPlusSquare} />&nbsp; Add Product</Link>
            <Link to="/editProduct" className="p-3 mb-2 nav-link"><FontAwesomeIcon icon={faPencilAlt} />&nbsp; Edit Product</Link>
          </Col>
          <Col md={9} className="content">
            <Route exact path="/" component={ManageProduct} />
            <Route path="/manageProduct" component={ManageProduct} />
            <Route path="/manageOrder" component={ManageOrder} />
            <Route path="/addProduct" component={AddProduct} />
            <Route path="/editProduct" component={EditProduct} />
          </Col>
        </Row>
      </HashRouter>
    </Container>
  );
};

export default AdminMenu;