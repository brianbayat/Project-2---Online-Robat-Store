const router = require('express').Router()
const {CartEntry, Robot} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

const isAuthorized = (req, userId) => {
  return (Number(req.user.dataValues.id) === Number(userId) || req.user.dataValues.isAdmin);
} 

router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    if (isAuthorized(req, userId)) {
      const entries = await CartEntry.findAll({where: {userId}})
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
    }
    else {
      res.statusMessage = "Access Forbidden";
      res.status(403).end();
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {userId, robotId, quantity} = req.body
    if (isAuthorized(req, userId)) {
      CartEntry.create({userId, robotId, quantity}).then(res.sendStatus(201));
    }
    else {
      res.statusMessage = "Access Forbidden";
      res.status(403).end();
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {userId, robotId, quantity} = req.body
    if (isAuthorized(req, userId)) {
      CartEntry.findAll({where: {userId, robotId}})
      .then(entry => entry[0].update({quantity}))
      .then(res.sendStatus(201))
    }
    else {
      res.statusMessage = "Access Forbidden";
      res.status(403).end();
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const {userId, robotId} = req.body
    if (isAuthorized(req, userId)) {
      CartEntry.findAll({where: {userId, robotId}})
      .then(entry => entry[0].destroy())
      .then(res.sendStatus(201))
    }
    else {
      res.statusMessage = "Access Forbidden";
      res.status(403).end();
    }
  } catch (err) {
    next(err)
  }
})
