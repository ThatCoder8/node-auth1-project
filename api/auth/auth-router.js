const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const { checkUsernameFree, checkPasswordLength, checkUsernameExists } = require('./auth-middleware')

router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    const newUser = await Users.add({ username, password: hash })
    res.status(201).json({
      user_id: newUser.user_id,
      username: newUser.username
    })
  } catch (err) {
    next(err)
  }
})

router.post('/login', checkUsernameExists, async (req, res, next) => {
  try {
    const { password } = req.body
    if (bcrypt.compareSync(password, req.user.password)) {
      req.session.user = req.user
      res.json({ message: `welcome ${req.user.username}` })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.json({ message: 'logged out' })
    })
  } else {
    res.json({ message: 'no session' })
  }
})

module.exports = router