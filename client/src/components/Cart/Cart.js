import React, { useContext } from 'react';
import { ProductContext } from '../../App';
import { UserContext } from '../../App';
import { useParams } from 'react-router';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { productId } = useParams();
  const [product, setProduct] = useContext(ProductContext);
  const [user, setUser] = useContext(UserContext);
  const cartProduct = product.find(pd => pd._id === productId);

  const cartData = {
    productName: cartProduct.productName,
    productType: cartProduct.productType,
    productPrice: cartProduct.productPrice,
    userName: user.displayName,
    userEmail: user.email,
    date: new Date()
  }

  const handleOrder = () => {
    fetch("https://desolate-cliffs-33849.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartData)
    })
      .then(res => {
        alert("product successfully purchased");
      })
  }

  return (
    <Container className="p-4">
      <h3 className="text-center my-3">Your cart</h3>
      <Table striped>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cartProduct.productName}</td>
            <td>{cartProduct.productType}</td>
            <td>{cartProduct.productPrice}</td>
          </tr>
          <tr>
            <td colSpan="2" className="font-weight-bold">Total Price: </td>
            <td className="font-weight-bold">{cartProduct.productPrice}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Link to="/home" className="btn btn-warning text-white mr-3">Back to shopping</Link>
        <Button onClick={handleOrder} variant="success">Proceed to checkout</Button>
      </div>
    </Container >
  );
};

export default Cart;