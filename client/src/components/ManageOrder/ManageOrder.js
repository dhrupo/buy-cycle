import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from 'react-bootstrap';

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://desolate-cliffs-33849.herokuapp.com/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [orders])

  const handleDeleteProduct = (id) => {
    fetch(`https://desolate-cliffs-33849.herokuapp.com/orderdelete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(data => {
        alert("product deleted");
        setOrders(orders);
      })
  }
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Product Name</th>
          <th>Product Type</th>
          <th>Price</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map(od =>
            <tr key={od._id}>
              <td>{od.userName || "none"}</td>
              <td>{od.userEmail || "none"}</td>
              <td>{od.productName}</td>
              <td>{od.productType}</td>
              <td>{od.productPrice}</td>
              <td>{new Date(od.date).toDateString("dd/MM/yyyy")}</td>
              <td>
                <Button size="sm" variant="success"><FontAwesomeIcon icon={faPencilAlt} /></Button>
                <Button onClick={() => handleDeleteProduct(od._id)} size="sm" variant="danger" className="ml-2"><FontAwesomeIcon icon={faTrashAlt} /></Button>
              </td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
};

export default ManageOrder;