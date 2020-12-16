import React from 'react'
import {CardContent, Typography} from '@material-ui/core/'

const AddToCartForm = props => {
  const {quantity, handleSubmit, handleChange} = props

  return (
    <Typography component="div">
      <CardContent>
        <h3>Add to Cart:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={handleChange}
            placeholder={quantity}
          />
          <button type="submit" disabled={!quantity ? true : false}>
            Add To Cart
          </button>
        </form>
      </CardContent>
    </Typography>
  )
}

export default AddToCartForm
