const Sequelize = require('sequelize')
const db = require('../db')

const CartEntry = db.define('cartEntry', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 0,
        }
    }
})

module.exports = CartEntry