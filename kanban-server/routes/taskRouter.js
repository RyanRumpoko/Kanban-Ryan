const express = require('express')
const router = express.Router()
const Controller = require('../controllers/taskController')
const { authenticate, authorize } = require('../middlewares/authenticate')

router.use(authenticate)
router.post('/', Controller.postTask)
router.get('/', Controller.getTask)
router.get('/:id', authorize, Controller.getTaskById)
router.put('/:id', authorize, Controller.putTask)
router.patch('/:id', authorize, Controller.patchTask)
router.delete('/:id', authorize, Controller.deleteTask)

module.exports = router