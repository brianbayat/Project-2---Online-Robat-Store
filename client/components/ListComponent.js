import React from 'react'
import {Grid, Card, Divider} from '@material-ui/core/'
import RobotPreview from './RobotPreview'
import AddToCart from './AddToCart'
import UpdateRemove from './UpdateRemove'

const ListComponent = props => {
  return (
    <Grid container spacing={24} style={{padding: 24}}>
      {!!props.robots ? (
        props.robots.map(robot => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={robot.id}>
            <Card>
              <RobotPreview robot={robot} />
              <Divider />
              {!!props.user.id ? (
                !!props.addToCart ? (
                  <AddToCart
                    robotId={robot.id}
                    addToCart={props.addToCart}
                    userId={props.user.id}
                  />
                ) : (
                  <UpdateRemove
                    entry={robot}
                    userId={props.user.id}
                    removeFromCart={props.removeFromCart}
                    updateCart={props.updateCart}
                    getCart={props.getCart}
                  />
                )
              ) : !!props.addToCartGuest ? (
                <AddToCart
                  robotId={robot.id}
                  addToCartGuest={props.addToCartGuest}
                />
              ) : (
                <UpdateRemove
                  entry={robot}
                  removeFromCartGuest={props.removeFromCartGuest}
                  updateCartGuest={props.updateCartGuest}
                  getCartGuest={props.getCartGuest}
                />
              )}
            </Card>
          </Grid>
        ))
      ) : (
        <div>There are no robots to display</div>
      )}
    </Grid>
  )
}

export default ListComponent
