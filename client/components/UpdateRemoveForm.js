import React from 'react'
import {CardContent, Typography} from '@material-ui/core/'

const UpdateRemoveForm = props => {
  const {
    userId,
    robotId,
    cartQuantity,
    stateQuantity,
    handleSubmit,
    handleChange,
    removeFromCart,
    removeFromCartGuest
  } = props

  return (
    <Typography component="div">
      <CardContent>
        <h3>Update/Remove from Cart:</h3>
        <form id="student-form" onSubmit={handleSubmit}>
          <label htmlFor="quantity">Quantity: {cartQuantity}</label>
          <input
            type="text"
            name="quantity"
            value={stateQuantity}
            onChange={handleChange}
          />

          <button type="submit" disabled={!stateQuantity ? true : false}>
            Update Cart
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            !!userId
              ? removeFromCart(userId, robotId)
              : removeFromCartGuest(robotId)
          }}
        >
          Remove From Cart
        </button>
      </CardContent>
    </Typography>
  )
}

export default UpdateRemoveForm
