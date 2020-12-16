const router = require('express').Router()
const {CompletedOrder, Robot} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const entries = await CompletedOrder.findAll({where: {userId}})
    const robotIds = entries.map(entry => entry.robotId)
      const robots = await Robot.findAll({
        where: {id: {[Op.in]: robotIds}}
      })
      const robotMap = {}
      robots.forEach(robot => {
        robotMap[robot.dataValues.id] = robot.dataValues
      })
      const data = entries.map(entry => {
        const robotId = entry.dataValues.robotId
        entry.dataValues.robotInfo = robotMap[robotId]
        return entry
      })
      res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {userId, robotId, quantity} = req.body
    const orderEntry = await CompletedOrder.create({userId, robotId, quantity})
    res.status(201).json(orderEntry)
  } catch (err) {
    next(err)
  }
})
