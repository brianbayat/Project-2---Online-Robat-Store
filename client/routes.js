import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  FullRobotList,
  FullCartList,
  SingleRobot,
  OrderHistoryComponent
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/robots" component={FullRobotList} />
        <Route path="/robots/:robotId" component={SingleRobot} />
        <Route path="/carts" component={FullCartList} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/completedOrders/" component={OrderHistoryComponent} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        <Redirect to="/robots" />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
