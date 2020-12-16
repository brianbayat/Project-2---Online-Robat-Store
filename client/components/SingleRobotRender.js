import React from 'react'
import AddToCart from './AddToCart'
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography
} from '@material-ui/core/'

const SingleRobotRender = props => {
  const {addToCart, user, robot, addToCartGuest} = props

  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <Card>
        <Typography component="div">
          <CardMedia
            style={{height: 0, paddingTop: '56.25%'}}
            image={robot.imageUrl}
          />
          <CardContent>
            <div>
              <Typography gutterBottom variant="headline" component="h1">
                {robot.name}
              </Typography>
              <h3>{robot.brand}</h3>
            </div>
            <div>
              <p>Price: ${robot.price}</p>
              <p>Rating: {robot.customerReviews}</p>
              <p>Description: {robot.description}</p>
            </div>
          </CardContent>
          <Divider />
          {!!user.id ? (
            <AddToCart
              robotId={robot.id}
              addToCart={addToCart}
              userId={user.id}
            />
          ) : (
            <AddToCart robotId={robot.id} addToCartGuest={addToCartGuest} />
          )}
        </Typography>
      </Card>
    </Grid>
  )
}

export default SingleRobotRender
