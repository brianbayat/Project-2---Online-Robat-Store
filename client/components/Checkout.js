import React from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import {Card, Typography, Grid, CardContent} from '@material-ui/core/'

const Checkout = props => {
  const {
    removeFromCartGuest,
    addToCompletedOrders,
    removeFromCart,
    robots
  } = props

  return (
    <Grid container spacing={24} style={{padding: 24}}>
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Typography component="div">
          <Card>
            <CardContent>
              <div id="StripeProvider">
                <StripeProvider apiKey="pk_test_gJYHhJq3o2kBKuBUPQM0SheY">
                  <div className="test">
                    <h1>Checkout</h1>
                    <Elements>
                      <CheckoutForm
                        addToCompletedOrders={addToCompletedOrders}
                        removeFromCart={removeFromCart}
                        robots={robots}
                        removeFromCartGuest={removeFromCartGuest}
                      />
                    </Elements>
                  </div>
                </StripeProvider>
              </div>
            </CardContent>
          </Card>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Checkout
