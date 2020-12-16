import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import robots from './robots'
import singleRobot from './singleRobot'
import cart from './cart'
import completedOrders from './completedOrders'
import guestCart from './guestCart'

const reducer = combineReducers({
  user,
  robots,
  singleRobot,
  cart,
  completedOrders,
  guestCart
})
// new reducer field needs to be added for orderedEntries (add, remove, etc.)


const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './robots'
export * from './singleRobot'
export * from './cart'
export * from './completedOrders'
export * from './guestCart'

