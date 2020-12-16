import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchCartEntries,
  removeEntryThunk,
  updateEntryThunk
} from '../store/cart'
import {
  updateEntryThunkGuest,
  removeEntryThunkGuest,
  fetchCartEntriesGuest
} from '../store/guestCart'
import {addOrderThunk} from '../store/completedOrders'
import ListComponent from './ListComponent'
import {me} from '../store/user'
import Checkout from './Checkout'

const mapStateToProps = state => {
  return {
    robotsInCart: state.cart.cartList,
    user: state.user,
    robotsInGuestCart: state.guestCart.cartList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: userId => dispatch(fetchCartEntries(userId)),
    removeFromCart: (userId, robotId) =>
      dispatch(removeEntryThunk(userId, robotId)),
    updateCart: (userId, robotId, quantityUpdate) =>
      dispatch(updateEntryThunk(userId, robotId, quantityUpdate)),
    getUser: () => dispatch(me()),
    addToCompletedOrders: (userId, robotId, quantity) =>
      dispatch(addOrderThunk(userId, robotId, quantity)),
    getCartGuest: () => dispatch(fetchCartEntriesGuest()),
    removeFromCartGuest: robotId => dispatch(removeEntryThunkGuest(robotId)),
    updateCartGuest: (robotId, quantityUpdate) =>
      dispatch(updateEntryThunkGuest(robotId, quantityUpdate))
  }
}

class FullCartList extends Component {
  async componentDidMount() {
    await this.props.getUser()
    if (!!this.props.user.id) {
      await this.props.getCart(this.props.user.id)
    } else {
      await this.props.getCartGuest()
    }
  }

  render() {
    const {
      robotsInCart,
      user,
      robotsInGuestCart,
      updateCart,
      removeFromCart,
      getCart,
      addToCompletedOrders,
      removeFromCartGuest,
      updateCartGuest,
      getCartGuest
    } = this.props
    let robots
    Boolean(this.props.user.id)
      ? (robots = robotsInCart)
      : (robots = robotsInGuestCart)

    return (
      <div>
        <h1>Your Cart:</h1>
        <ListComponent
          robots={robots}
          user={user}
          removeFromCart={removeFromCart}
          updateCart={updateCart}
          getCart={getCart}
          removeFromCartGuest={removeFromCartGuest}
          updateCartGuest={updateCartGuest}
          getCartGuest={getCartGuest}
        />
        <Checkout
          addToCompletedOrders={addToCompletedOrders}
          removeFromCart={removeFromCart}
          robots={robots}
          removeFromCartGuest={removeFromCartGuest}
        />
      </div>
    )
  }
}

const ConnectedFullCartList = connect(mapStateToProps, mapDispatchToProps)(
  FullCartList
)

export default ConnectedFullCartList
