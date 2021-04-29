import React from 'react';
import { Container } from 'react-bootstrap';
import Products from '../Products/Products';
import Search from '../Search/Search'

const Home = () => {
  return (
    <Container>
      <Search></Search>
      <Products></Products>
    </Container>
  );
};

export default Home;