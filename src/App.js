import './App.css';
import React, { useState } from "react";
import Axios from "axios";
import {
  Card,
  TextField
} from '@mui/material';

import ProductSearchList from './components/ProductSearchList.js';
import ProductNotFound from './components/ProductNotFound';
import { SearchQuery } from './constant/ApplicationConstants';

function App() {

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  const fetchProducts = async (query) => {
    setSearchQuery(query);
    if (query != undefined && query.length >= SearchQuery.SEARCH_QUERY_LENGTH) {
      const { data } = await Axios.get(
        "http://localhost:8080/api/v1/productservice/searchProductDetails?query=" + query
      );
      const products = data;
      setProducts(products);
    } else {
      setProducts([]);
    }
  };

  return (
    <div style={{
      background: "#ffffff",
      paddingTop: 128,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'column',
    }}>
      <div>
        <TextField
          id="outlined-basic"
          label="Search Products..."
          variant="outlined"
          onChange={(e) => fetchProducts(e.target.value)}
          style={{ width: 600 }}
        />
      </div>
      {
        products.length > 0 ?
          <div>
            <Card style={{
              width: 598,
              border: "1px solid #BEBEBE",
              margin: "12px",
              boxShadow: "none"
            }}>
              <ProductSearchList products={{ products }} />
            </Card>
          </div>
          :
          searchQuery.length >= SearchQuery.SEARCH_QUERY_LENGTH
            ?
            <ProductNotFound />
            :
            null
      }
    </div>
  );
}

export default App;
