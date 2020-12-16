import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {AppBar, Toolbar, Typography, Menu, IconButton} from '@material-ui/core/'
import {Menu as MenuButton} from '@material-ui/icons/'
import {MenuUser} from './MenuUser'
import {MenuGuest} from './MenuGuest'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  handleMenuClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {handleClick, isLoggedIn} = this.props
    const open = Boolean(this.state.anchorEl)

    return (
      <div>
        <AppBar position="static">
          <Typography variant="title" color="inherit" component="div">
            <h2>Grace Shopper</h2>
            <Toolbar>
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuClick}
              >
                <MenuButton />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={this.state.anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: 200
                  }
                }}
              >
                {isLoggedIn ? (
                  <MenuUser
                    handleClick={handleClick}
                    handleClose={this.handleClose}
                  />
                ) : (
                  <MenuGuest handleClose={this.handleClose} />
                )}
              </Menu>
            </Toolbar>
          </Typography>
        </AppBar>
        <hr />
      </div>
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
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
