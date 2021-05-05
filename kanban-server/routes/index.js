const express = require('express')
const router = express.Router()
const user = require('./userRouter')
const task = require('./taskRouter')

router.use('/', user)
router.use('/tasks', task)

module.exports = router