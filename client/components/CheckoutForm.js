import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(event) {
    const {token} = await this.props.stripe.createToken({name: 'Name'})
    const response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) {
      this.props.robots.map(async robot => {
        await this.props.addToCompletedOrders(
          robot.userId,
          robot.robotId,
          robot.quantity
        )
        await this.props.removeFromCart(robot.userId, robot.robotId)
        await this.props.removeFromCartGuest(robot.robotId)
      })
      this.setState({complete: true})
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="submit" onClick={this.submit}>
          Complete Checkout
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
