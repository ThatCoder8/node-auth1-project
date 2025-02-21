const db = require('../../data/db-config')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
async function find() {
  return await db('users').select('user_id', 'username')
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  return await db('users').where(filter).first()
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(id) {
  return await db('users').where('user_id', id).first()
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
}

module.exports = {
  find,
  findBy,
  findById,
  add,
}