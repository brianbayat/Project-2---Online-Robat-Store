import axios from 'axios'

// Actions
const ADD_TO_COMPLETED_ORDERS = 'ADD_TO_COMPLETED_ORDERS'

//Completed Orders
export const addOrder = orders => ({
  type: ADD_TO_COMPLETED_ORDERS,
  orders
})

// Initial State
const defaultCompletedOrder = {
  completedOrders: []
}

export const addOrderThunk = (userId, robotId, quantity) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/completedOrders', {
        userId,
        robotId,
        quantity
      })
      const orders = response.data
      dispatch(addOrder(orders))
    } catch (err) {
      console.log(err)
    }
  }
}

const completedOrderReducer = (state = defaultCompletedOrder, action) => {
  switch (action.type) {
    case ADD_TO_COMPLETED_ORDERS:
      return {
        ...state,
        completedOrders: [...state.completedOrders, action.orders]
      }
    default:
      return state
  }
}

export default completedOrderReducer
