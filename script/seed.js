'use strict'

const db = require('../server/db')
const {User, Robot, CartEntry} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  
  const robots = await Promise.all([
    Robot.create({
      name: 'Roomba 690',
      price: 297.00,
      brand: 'iRobot',
      customerReviews: 4,
      description: 'Connect to clean from anywhere with the Roomba 690 robot vacuum. The 3-Stage Cleaning System is specially engineered to loosen, lift, and suction everything from small particles to large debris from carpets and hard floors. Dirt Detect sensors alert the Roomba robot vacuum to clean more thoroughly on concentrated areas of dirt. Just press clean or schedule Roomba on the go with the iRobot Home App.'
    }),
    Robot.create({
      name: 'Roomba 42',
      price: 100.23,
      brand: 'SharkNinja',
      customerReviews: 5,
      description: 'Actually 10x better than the Roomba 690'
    }),
    Robot.create({
      name: 'C3P0',
      price: 4000.65,
      brand: 'eufy',
      customerReviews: 0,
      description: 'Friendly robit'
    }),
    Robot.create({
      name: 'Self-Hating Robot',
      price: 10.90,
      brand: 'ECOVACS',
      customerReviews: 1,
      description: 'Sad robit'
    }),
    Robot.create({
      name: 'ES-Linter',
      price: 50.33,
      brand: 'ILIFE',
      customerReviews: 0,
      description: 'Do not listen to it'
    })
  ])

  console.log(`seeded ${robots.length} robots`)
  
  const cartEntries = await Promise.all([
    CartEntry.create({
      userId: 1,
      robotId: 4,
      quantity: 2
    }),
    CartEntry.create({
      userId: 2,
      robotId: 3,
      quantity: 1
    }),
    CartEntry.create({
      userId: 2,
      robotId: 4,
      quantity: 6
    })
  ])
  
  console.log(`seeded ${cartEntries.length} Cart Entries`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
