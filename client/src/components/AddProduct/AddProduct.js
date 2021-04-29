import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const AddProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [product, setProduct] = useState([]);
  const { register, errors, handleSubmit } = useForm();

  const handleImage = (event) => {
    const imageData = new FormData();
    imageData.set('key', '37f029fbad0bc04bad49bf29e58b8aef');
    imageData.append('image', event.target.files[0]);

    axios.post("https://api.imgbb.com/1/upload", imageData)
      .then(res => {
        setProductImage(res.data.data.display_url);
      })
      .catch(error => console.log(error))
  }

  const onSubmit = (data) => {
    const productData = {
      productName: data.productName,
      productType: data.productType,
      productPrice: data.productPrice,
      productImage: productImage
    }

    fetch("https://desolate-cliffs-33849.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    })
      .then(res => {
        alert("product successfully added");
        setProduct(product);
      })
  };
  return (
    <Form className="p-4" onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Bicycle Name</Form.Label>
          <Form.Control type="text" name="productName" placeholder="Enter Product Name" ref={register({ required: true })} />
          {errors.productName && errors.productName.type === "required" && <span className="text-danger">Product name is required</span>}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Bicycle Type</Form.Label>
          <Form.Control name="productType" as="select" ref={register({ required: true })}>
            <option value="mountain bike">Mountain Bike</option>
            <option value="road bike">Road Bike</option>
          </Form.Control>
          {errors.productType && errors.productType.type === "required" && <span className="text-danger">Product type is required</span>}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Bicycle Price</Form.Label>
          <Form.Control type="text" name="productPrice" placeholder="Enter Product Price" ref={register({ required: true })} />
          {errors.productPrice && errors.productPrice.type === "required" && <span className="text-danger">Product price is required</span>}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Bicycle Image</Form.Label>
          <Form.File onChange={handleImage} name="productImage" ref={register({ required: true })} />
          {errors.productImage && errors.productImage.type === "required" && <span className="text-danger">Product image is required</span>}
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Button type="submit" variant="primary" size="lg" className="px-4 ml-auto">Save Product</Button>
      </Form.Row>
    </Form>
  );
}

export default AddProduct;