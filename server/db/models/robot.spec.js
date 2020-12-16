/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Robot = db.model('robot')

describe('Robot model', () => {
  beforeEach(() => {
    return db.sync({
      force: true
    })
  })

  let roomba
  beforeEach(async () => {
    roomba = await Robot.create({
      name: 'Roomba 690',
      price: 297.00,
      brand: 'iRobot',
      customerReviews: 4,
      description: 'Connect to clean from anywhere with the Roomba 690 robot vacuum. The 3-Stage Cleaning System is specially engineered to loosen, lift, and suction everything from small particles to large debris from carpets and hard floors. Dirt Detect sensors alert the Roomba robot vacuum to clean more thoroughly on concentrated areas of dirt. Just press clean or schedule Roomba on the go with the iRobot Home App.'
    })
  })

  describe('instanceMethods', () => {

    it('contains a "name" field', () => {
      expect(roomba.name).to.be.equal('Roomba 690')
    })

    it('contains a "price" field', () => {
      expect(Number(roomba.price)).to.be.equal(297.00)
    })

    it('contains a valid "brand" name', () => {
      expect(roomba.brand).to.be.equal('iRobot')
    })

    it('contains a valid "customerReviews"', () => {
      expect(Number(roomba.customerReviews)).to.be.equal(4)
    })

    it('contains a valid "customerReviews" field', () => {
      expect(roomba.description).to.be.equal('Connect to clean from anywhere with the Roomba 690 robot vacuum. The 3-Stage Cleaning System is specially engineered to loosen, lift, and suction everything from small particles to large debris from carpets and hard floors. Dirt Detect sensors alert the Roomba robot vacuum to clean more thoroughly on concentrated areas of dirt. Just press clean or schedule Roomba on the go with the iRobot Home App.')
    })
  }) // end describe('instanceMethods')

  describe('validations', function () {
    let roomba;
    beforeEach(function () {
      roomba = Robot.build();
    })

    it('contains errors if model instances are created without proper validations', function () {
      return roomba.validate()
      .catch(function (err) {
        expect(err).to.exist;
        });
    });
  })
}) // end describe('Robot model'