import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRobot} from '../store/singleRobot'
import {addEntryThunk, fetchCartEntries} from '../store/cart'
import {addEntryThunkGuest, fetchCartEntriesGuest} from '../store/guestCart'
import {me} from '../store/user'
import SingleRobotRender from './SingleRobotRender'

const mapStateToProps = state => {
  return {
    robot: state.singleRobot.robot,
    user: state.user,
    robotsInCart: state.cart.cartList,
    robotsInGuestCart: state.guestCart.cartList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRobot: robotId => dispatch(fetchRobot(robotId)),
    getCart: userId => dispatch(fetchCartEntries(userId)),
    addToCart: (userId, robotId, quantity) =>
      dispatch(addEntryThunk(userId, robotId, quantity)),
    getUser: () => dispatch(me()),
    getCartGuest: () => dispatch(fetchCartEntriesGuest()),
    addToCartGuest: (robotId, quantity) =>
      dispatch(addEntryThunkGuest(robotId, quantity))
  }
}

class SingleRobot extends Component {
  async componentDidMount() {
    await this.props.getUser()
    if (!!this.props.user.id) {
      await this.props.getCart(this.props.user.id)
    } else {
      await this.props.getCartGuest()
    }
    await this.props.getRobot(Number(this.props.match.params.robotId))
  }

  render() {
    return <SingleRobotRender {...this.props} />
  }
}

const ConnectedSingleRobot = connect(mapStateToProps, mapDispatchToProps)(
  SingleRobot
)

export default ConnectedSingleRobot
