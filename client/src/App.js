import React, { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import AdminMenu from './components/AdminMenu/AdminMenu';
import Cart from './components/Cart/Cart';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
export const ProductContext = createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://desolate-cliffs-33849.herokuapp.com/products")
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
  }, [product])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ProductContext.Provider value={[product, setProduct]}>
        <Router>
          <Navigation></Navigation>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/registration">
              <Registration></Registration>
            </Route>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute path="/cart/:productId">
              <Cart></Cart>
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <AdminMenu></AdminMenu>
            </PrivateRoute>
          </Switch>
        </Router>
      </ProductContext.Provider>
    </UserContext.Provider >
  );
}

export default App;
