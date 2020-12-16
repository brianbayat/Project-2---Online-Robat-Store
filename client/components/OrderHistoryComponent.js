import React from 'react'
import axios from 'axios'
import {
    Grid,
    Card,
    CardContent,
    Divider,
    Typography
  } from '@material-ui/core/'
import RobotPreview from './RobotPreview'
import {connect} from 'react-redux'
import {me} from '../store/user'

class OrderHistoryComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: [],
        }
    }
    
    async componentDidMount() {
        await this.props.getUser();
        const userId = Number(this.props.user.id);
        const response = await axios.get(`/api/completedOrders/${userId}`);
        this.setState({orders: response.data});
    }

    render() {
        return (
        <Grid container spacing={24} style={{padding: 24}}>
        {this.state.orders.map(order => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={order.id}>
                <Card>
                    <RobotPreview robot={order.robotInfo} />
                    <Divider />
                    <Typography component="div">
                        <CardContent>
                            <p>Quantity: {order.quantity}</p>
                        </CardContent>
                    </Typography>
                </Card>
            </Grid>
        ))}
        </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
      user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(me())
    }
}

const ConnectedOrderHistoryComponent = connect(mapStateToProps, mapDispatchToProps)(
    OrderHistoryComponent
  )
  
  export default ConnectedOrderHistoryComponent