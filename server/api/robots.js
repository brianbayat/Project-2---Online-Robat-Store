const router = require('express').Router()
const {Robot} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const robots = await Robot.findAll()
        res.json(robots)
  } catch (err) {
    next(err)
  }
})

router.get('/:robotId', async (req, res, next) => {
    try {
        const robot = await Robot.findById(req.params.robotId)
        res.json(robot)
    } catch (err) {
        next(err)
    }
})

router.get('/byBrand/:brand', async (req, res, next) => {
    try {
        const robotsByBrand = await Robot.findAll({where: {brand: req.params.brand}})
        res.json(robotsByBrand)
    } catch(err) {
        next(err)
    }
})