import axios from 'axios'
import history from '../history'

// Actions
const ADD_TO_CART_GUEST = 'ADD_TO_CART_GUEST'
const UPDATE_CART_GUEST = 'UPDATE_CART_GUEST'
const REMOVE_FROM_CART_GUEST = 'REMOVE_FROM_CART_GUEST'
const GET_CART_ENTRIES_GUEST = 'GET_CART_ENTRIES_GUEST'

// Initial State
const defaultCart = {
  cartList: []
}

// Action creator
export const addToCartGuest = entry => ({
  type: ADD_TO_CART_GUEST,
  entry
})

export const updateCartGuest = entry => ({
  type: UPDATE_CART_GUEST,
  entry
})

export const removeRobotGuest = robotId => ({
  type: REMOVE_FROM_CART_GUEST,
  robotId
})

export const getCartEntriesGuest = entries => ({
  type: GET_CART_ENTRIES_GUEST,
  entries
})

//Thunk creator

export const updateEntryThunkGuest = (robotId, quantity) => {
  return async dispatch => {
    try {
      let entryMatch = await JSON.parse(localStorage.getItem(robotId))

      entryMatch.quantity = quantity

      await localStorage.setItem(
        JSON.stringify(robotId),
        JSON.stringify(entryMatch)
      )
      dispatch(updateCartGuest(entryMatch))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addEntryThunkGuest = (robotId, quantity) => {
  return async dispatch => {
    try {
      let newEntry
      const entryMatch = await JSON.parse(localStorage.getItem(robotId))
      if (entryMatch) {
        newEntry = entryMatch
        newEntry.quantity = newEntry.quantity + quantity
      } else {
        newEntry = {
          robotId: robotId,
          quantity: quantity
        }
      }
      await axios
        .get(`/api/robots/${robotId}`)
        .then(response => {
          newEntry.robotInfo = response.data
        })
        .then(
          await localStorage.setItem(
            JSON.stringify(robotId),
            JSON.stringify(newEntry)
          )
        )
      dispatch(addToCartGuest(newEntry))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeEntryThunkGuest = robotId => {
  return async dispatch => {
    try {
      await localStorage.removeItem(JSON.stringify(robotId))
      dispatch(removeRobotGuest(robotId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchCartEntriesGuest = () => {
  return dispatch => {
    try {
      let allRobotsId = Object.keys(localStorage)
      let allRobots = allRobotsId
        .slice(0, allRobotsId.length - 1)
        .map(async id => {
          let robot = JSON.parse(localStorage.getItem(id))
          await axios.get(`/api/robots/${id}`).then(response => {
            robot.robotInfo = response.data
          })
          return robot
        })
      Promise.all(allRobots).then(values =>
        dispatch(getCartEntriesGuest(values))
      )
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer

const cartReducerGuest = (state = defaultCart, action) => {
  switch (action.type) {
    case ADD_TO_CART_GUEST:
      return {...state, cartList: [...state.cartList, action.entry]}
    case UPDATE_CART_GUEST:
      let newCartList = [...state.cartList].map(entry => {
        if (entry.robotId === action.entry.robotId) {
          return action.entry
        }
        return entry
      })
      return {...state, cartList: newCartList}

    case REMOVE_FROM_CART_GUEST:
      return {
        ...state,
        cartList: [...state.cartList].filter(
          entry => entry.robotInfo.id !== action.robotId
        )
      }
    case GET_CART_ENTRIES_GUEST:
      return {...state, cartList: action.entries}

    default:
      return state
  }
}

export default cartReducerGuest
