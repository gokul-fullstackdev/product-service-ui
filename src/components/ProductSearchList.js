import React, { Component } from 'react'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
  } from '@mui/material';

export class ProductSearchList extends Component {
    render() {
        return (
            <div>
                <List>
                {
                  this.props.products && this.props.products.products.map((product, index) => {
                    return (
                      <ListItem disablePadding key={product.productId}>
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
            </div>
        )
    }
}

export default ProductSearchList