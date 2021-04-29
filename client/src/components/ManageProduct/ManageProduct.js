import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://desolate-cliffs-33849.herokuapp.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [products])

  const handleDeleteProduct = (id) => {
    fetch(`https://desolate-cliffs-33849.herokuapp.com/productdelete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(data => {
        alert("product deleted");
        setProducts(products);
      })
  }
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Type</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map(pd =>
            <tr key={pd._id}>
              <td>{pd.productName}</td>
              <td>{pd.productType}</td>
              <td>{pd.productPrice}</td>
              <td>
                <Button size="sm" variant="success"><FontAwesomeIcon icon={faPencilAlt} /></Button>
                <Button onClick={() => handleDeleteProduct(pd._id)} size="sm" variant="danger" className="ml-2"><FontAwesomeIcon icon={faTrashAlt} /></Button>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
};

export default ManageProduct;