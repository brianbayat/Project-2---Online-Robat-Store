const Sequelize = require('sequelize')
const db = require('../db')

const CompletedOrder = db.define('completedOrder', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  robotId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 0,
        }
    }
})

module.exports = CompletedOrder;