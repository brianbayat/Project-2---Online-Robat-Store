import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRobots} from '../store/robots'
import {addEntryThunk, fetchCartEntries} from '../store/cart'
import {addEntryThunkGuest, fetchCartEntriesGuest} from '../store/guestCart'
import ListComponent from './ListComponent'
import {me} from '../store/user'

const mapStateToProps = state => {
  return {
    robots: state.robots.robots,
    user: state.user,
    robotsInCart: state.cart.cartList,
    robotsInGuestCart: state.guestCart.cartList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRobots: () => dispatch(fetchRobots()),
    getCart: userId => dispatch(fetchCartEntries(userId)),
    addToCart: (userId, robotId, quantity) =>
      dispatch(addEntryThunk(userId, robotId, quantity)),
    getUser: () => dispatch(me()),

    getCartGuest: () => dispatch(fetchCartEntriesGuest()),
    addToCartGuest: (robotId, quantity) =>
      dispatch(addEntryThunkGuest(robotId, quantity))
  }
}

class FullRobotList extends Component {
  async componentDidMount() {
    await this.props.getUser()
    if (!!this.props.user.id) {
      await this.props.getCart(this.props.user.id)
    } else {
      await this.props.getCartGuest()
    }
    await this.props.fetchRobots()
  }

  render() {
    const {robots, user, addToCart, addToCartGuest} = this.props

    return (
      <div>
        <h1>Robots:</h1>
        <ListComponent
          robots={robots}
          user={user}
          addToCart={addToCart}
          addToCartGuest={addToCartGuest}
        />
      </div>
    )
  }
}

const ConnectedFullRobotList = connect(mapStateToProps, mapDispatchToProps)(
  FullRobotList
)

export default ConnectedFullRobotList
