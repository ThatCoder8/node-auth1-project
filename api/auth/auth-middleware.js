const Users = require('../users/users-model')

const restricted = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'you shall not pass!' })
  }
}

const checkUsernameFree = async (req, res, next) => {
  try {
    const existing = await Users.findBy({ username: req.body.username })
    if (existing) {
      res.status(422).json({ message: 'Username taken' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkPasswordLength = (req, res, next) => {
  if (!req.body.password || req.body.password.length <= 3) {
    res.status(422).json({ message: 'password must be longer than 3' })
  } else {
    next()
  }
}

const checkUsernameExists = async (req, res, next) => {
  try {
    const user = await Users.findBy({ username: req.body.username })
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkPasswordLength,
  checkUsernameExists,
}