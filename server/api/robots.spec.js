/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Robot = db.model('robot')

describe('Robot routes', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    })
  })

  describe('/api/robots/', () => {
    const roomba = {
      name: 'MegaRoomba 5000',
      price: 297.00,
      brand: 'iRobot',
      customerReviews: 4,
      description: 'Maximum cleaning!'
    }

    beforeEach(() => {
      return Robot.create(roomba)
    })

    it('GET `/api/robots` route', async () => {
      const res = await request(app)
        .get('/api/robots')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(roomba.name)
      expect(Number(res.body[0].price)).to.be.equal(roomba.price)
      expect(res.body[0].brand).to.be.equal(roomba.brand)
      expect(res.body[0].customerReviews).to.be.equal(roomba.customerReviews)
      expect(res.body[0].description).to.be.equal(roomba.description)
    })

    it('GET `/api/robots/:robotId` route', async () => {
      const res = await request(app)
        .get('/api/robots/1')
        .expect(200)
      expect(res.body.id).to.equal(1)
    })

    it('GET `/api/robots/byBrand/:brand` route', async () => {
        const res = await request(app)
          .get('/api/robots/byBrand/iRobot')
          .expect(200)
        expect(res.body[0].brand).to.equal('iRobot')
      })
  }) // end describe('/api/robots')
}) // end describe('robots routes')
