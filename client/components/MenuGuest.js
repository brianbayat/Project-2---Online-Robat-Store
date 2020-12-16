import React from 'react'
import {Link} from 'react-router-dom'
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core/'
import {Android, ShoppingCart} from '@material-ui/icons/'

export const MenuGuest = props => (
  <MenuList>
    <MenuItem button component={Link} to="/robots" onClick={props.handleClose}>
      <ListItemIcon>
        <Android />
      </ListItemIcon>
      <ListItemText primary="Robots" />
    </MenuItem>
    <MenuItem button component={Link} to="/carts" onClick={props.handleClose}>
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Shopping Cart" />
    </MenuItem>
    <Divider />
    <MenuItem button component={Link} to="/login" onClick={props.handleClose}>
      Login
    </MenuItem>
    <MenuItem button component={Link} to="/signup" onClick={props.handleClose}>
      Sign Up
    </MenuItem>
  </MenuList>
)
