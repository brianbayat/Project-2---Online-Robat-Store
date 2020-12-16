import React, {Component} from 'react'
import UpdateRemoveForm from './UpdateRemoveForm'

class UpdateRemove extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: Number(event.target.value)
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.props.userId) {
      await this.props.updateCart(
        this.props.userId,
        this.props.entry.robotId,
        this.state.quantity
      )
      await this.props.getCart(this.props.userId)
    } else {
      await this.props.updateCartGuest(
        this.props.entry.robotId,
        this.state.quantity
      )
      await this.props.getCartGuest()
    }

    this.setState({
      quantity: 0
    })
  }

  render() {
    const {entry, userId, removeFromCart, removeFromCartGuest} = this.props

    return (
      <div>
        <UpdateRemoveForm
          stateQuantity={this.state.quantity}
          cartQuantity={entry.quantity}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          removeFromCart={removeFromCart}
          robotId={entry.robotId}
          userId={userId}
          removeFromCartGuest={removeFromCartGuest}
        />
      </div>
    )
  }
}

export default UpdateRemove
