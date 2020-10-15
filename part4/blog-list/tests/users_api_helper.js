const User = require('../models/User')

const usersInDb = async () => await User.find({})

module.exports = { usersInDb }
