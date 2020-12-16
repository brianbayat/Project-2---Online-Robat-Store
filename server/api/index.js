const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/robots', require('./robots'))
router.use('/carts', require('./carts'))
router.use('/completedOrders', require('./completedOrders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
