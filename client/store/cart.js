import axios from 'axios'

// Actions
export const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_CART_ENTRIES = 'GET_CART_ENTRIES'

// Initial State
const defaultCart = {
  cartList: [],
}

// Action creator
// userId, RobotId, Quantity
export const addToCart = entry => ({
  type: ADD_TO_CART,
  entry
})
// userId, RobotId, Quantity
export const updateCart = entry => ({
  type: UPDATE_CART,
  entry
})

export const removeRobot = robotId => ({
  type: REMOVE_FROM_CART,
  robotId
})

export const getCartEntries = entries => ({
  type: GET_CART_ENTRIES,
  entries
})


//Thunk creator

export const updateEntryThunk = (userId, robotId, quantity) => {
  return async dispatch => {
    try {
      const response = await axios.put('/api/carts', {
        userId,
        robotId,
        quantity
      })
      const entryData = response.data
      dispatch(updateCart(entryData))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addEntryThunk = (userId, robotId, quantity) => {
  return async (dispatch, getState) => {
    try {
      const entryMatch = getState().cart.cartList.filter(entry => {
        return entry.robotId === robotId && entry.userId === userId
      })
      if (!!entryMatch[0]) {
        const newQuantity = entryMatch[0].quantity + quantity
        dispatch(updateEntryThunk(userId, robotId, newQuantity))
      } else {
        const response = await axios.post('/api/carts', {
          userId,
          robotId,
          quantity
        })
        const entryData = response.data
        dispatch(addToCart(entryData))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeEntryThunk = (userId, robotId) => {
  return async dispatch => {
    try {
      await axios.delete('/api/carts', {data: {userId, robotId}})
      dispatch(removeRobot(robotId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchCartEntries = userId => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/carts/' + userId)
      const entries = response.data
      dispatch(getCartEntries(entries))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer

const cartReducer = (state = defaultCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cartList: [...state.cartList, action.entry]}
    case UPDATE_CART:
      const newCartList = [...state.cartList].map(entry => {
        if (entry.robotId === action.entry.robotId) {
          return action.entry
        }
        return entry
      })
      return {...state, cartList: newCartList}

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartList: [...state.cartList].filter(
          entry => entry.robotInfo.id !== action.robotId
        )
      }
    case GET_CART_ENTRIES:
      return {...state, cartList: action.entries}

    default:
      return state
  }
}

export default cartReducer
