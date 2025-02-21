const router = require('express').Router()
const Users = require('./users-model')
const { restricted } = require('../auth/auth-middleware')

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

router.get('/', restricted, async (req, res, next) => {
  try {
    const users = await Users.find()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router