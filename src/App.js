import './App.css';
import React, { useState } from "react";
import Axios from "axios";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';

function App() {

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  const fetchProducts = async (query) => {
    setSearchQuery(query);
    if (query != undefined && query.length >= 3) {
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
              <List>
                {
                  products.map((product, index) => {
                    return (
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary={product.productName}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                  style={{ marginRight: 12 }}>
                                  INR {product.productPrice}
                                </Typography>
                                {product.productDescription}
                              </React.Fragment>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })
                }
              </List>
            </Card>
          </div>
          :
          searchQuery.length > 0
            ?
            <p>Product Not Found</p>
            :
            null
      }
    </div>
  );
}

export default App;
