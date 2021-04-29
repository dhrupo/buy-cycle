import React from 'react';
import { Form } from 'react-bootstrap';
import "./Search.css";

const Search = () => {
  return (
    <Form className="search-form">
      <div className="input-group my-3">
        <input type="text" className="form-control" placeholder="Search Bicycle" />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </Form>
  );
};

export default Search;