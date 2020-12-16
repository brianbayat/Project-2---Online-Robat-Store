const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
const chaiSpies = require('chai-spies')
chai.use(chaiThings)
chai.use(chaiSpies)

// Redux
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  cartList: []
}
const store = mockStore(initialState)
import cartReducer, {ADD_TO_CART, addToCart, addEntryThunk} from './cart'

describe('redux store', () => {
  describe('action creators', () => {
    const funRobotEntry = {userId: 1, robotId: 1, quantity: 10}

    let mock
    before(() => {
      mock = new MockAdapter(axios)
    })

    afterEach(() => {
      mock.reset()
    })

    after(() => {
      mock.restore()
    })

    it('should allow synchronous creation of ADD_TO_CART actions', () => {
      const addToCartAction = addToCart(funRobotEntry)
      expect(addToCartAction.type).to.equal(ADD_TO_CART)
      expect(addToCartAction.entry).to.eql(funRobotEntry)
    })

    xit('addEntryThunk() returns a thunk to post a new robot to the backend and dispatch an ADD_TO_CART action', async () => {
      mock.onPost('/api/carts').replyOnce(201, funRobotEntry)

      await store.dispatch(addEntryThunk(1, 1, 10))
      const actions = store.getActions()
      console.log('actions-----------------: ', actions)
      expect(actions[0].type).to.equal('ADD_TO_CART')
      expect(actions[0].entry).to.deep.equal(funRobotEntry)
    })
  })

  describe('reducer', () => {
    it('returns a new state with the newly created entry added to the list of shopping cart entries', () => {
      const remoteEntry = {userId: 2, robotId: 2, quantity: 20}
      const funRobotEntry = {userId: 1, robotId: 1, quantity: 10}
      initialState.cartList = [remoteEntry]
      const newState = cartReducer(initialState, {
        type: ADD_TO_CART,
        entry: funRobotEntry
      })
      expect(newState.cartList.length).to.equal(2)
      expect(newState.cartList.find(entry => entry.userId === 1)).to.deep.equal(
        funRobotEntry
      )
    })
  })
})
