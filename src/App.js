import './App.css';
import React, { useState } from "react";
import Axios from "axios";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Slide,
  TextField
} from '@mui/material';

import ProductSearchList from './components/ProductSearchList.js';
import ProductNotFound from './components/ProductNotFound';
import { SearchQuery } from './constant/ApplicationConstants';
import { AddShoppingCartOutlined } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);

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

  const saveProduct = async () => {
    if (productName != undefined && productName.length >= 0
      && productDescription != undefined && productDescription.length >= 0
      && productPrice != undefined && productPrice >= 0) {
      await Axios.post(
        "http://localhost:8080/api/v1/productservice/saveProductDetails",
        {
          productId: productId,
          productName: productName,
          productDescription: productDescription,
          productPrice: productPrice
        }
      );

      setProductId("");
      setProductName("");
      setProductDescription("");
      setProductPrice();
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <div style={{
        paddingBottom: 16,
        width: '598px',
        display: "flex",
        flexDirection: 'column',
      }}>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          disableElevation
          color='grey'
          startIcon={<AddShoppingCartOutlined />}
          style={{
            alignItems: "flex-end",
            alignContent: "flex-end",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
          }}>
          Add New Product
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add New Product"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="id"
              label="Product ID"
              type="text"
              fullWidth
              variant="outlined"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="Product Name"
              type="text"
              fullWidth
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Product Description"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              id="price"
              label="Product Price"
              type="number"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">INR</InputAdornment>
              }}
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={saveProduct}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
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
