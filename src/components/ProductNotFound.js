import React, { Component } from 'react'
import { ErrorMessage } from '../constant/ApplicationConstants'

export class ProductNotFound extends Component {
  render() {
    return (
      <div>
        <p>{ErrorMessage.PRODUCT_NOT_FOUND}</p>
      </div>
    )
  }
}

export default ProductNotFound