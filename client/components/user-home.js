import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core/'
import {ShoppingCart, Android} from '@material-ui/icons/'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Typography component="div">
      <h3>Welcome, {email}</h3>
      <List>
        <ListItem button component={Link} to="/robots">
          <ListItemIcon>
            <Android />
          </ListItemIcon>
          <ListItemText primary="Robots" />
        </ListItem>
        <ListItem button component={Link} to="/carts">
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Shopping Cart" />
        </ListItem>
      </List>
    </Typography>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
