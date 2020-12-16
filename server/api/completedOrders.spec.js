/* global describe beforeEach it  */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const CompletedOrder = db.model('completedOrder')

describe('CompletedOrder routes', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    })
  })

  describe('/api/completedOrders/', () => {
    const order = {
      userId: 1,
      robotId: 2,
      quantity: 3
    }

    it('POST `/api/completedOrders` route', async () => {
      const res = await request(app)
        .post('/api/completedOrders')
        .send(order)
        .expect(201)

      const createdOrder = await CompletedOrder.findById(res.body.id)
      expect(createdOrder.quantity).to.be.equal(order.quantity)
    })
  })
})
