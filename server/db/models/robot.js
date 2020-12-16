const Sequelize = require('sequelize')
const db = require('../db')

// Defines the Robot product model
// 'brand' field validates whether its value is equal to a pre-existing company name (taken from the "Featured Brands" tab on Amazon's 'Robots & Robotics' page) using isIn

const Robot = db.define('robot', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  brand: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          isIn: [['iRobot', 'SharkNinja', 'eufy', 'ECOVACS', 'ILIFE', 'amarey', 'Arduino']]
      }
  },
  customerReviews: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        min: 0,
        max: 5
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://static.thenounproject.com/png/584365-200.png',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Robot;