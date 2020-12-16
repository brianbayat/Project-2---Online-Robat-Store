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

export const MenuUser = props => (
  <MenuList>
    <MenuItem button component={Link} to="/home" onClick={props.handleClose}>
      <ListItemIcon>
        <Android />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </MenuItem>
    <Divider />
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
    <MenuItem button component={Link} to="/completedOrders">
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Order History" />
    </MenuItem>
    <Divider />
    <MenuItem
      button
      href="#"
      onClick={function() {
        props.handleClick()
        props.handleClose()
      }}
    >
      Logout
    </MenuItem>
  </MenuList>
)
