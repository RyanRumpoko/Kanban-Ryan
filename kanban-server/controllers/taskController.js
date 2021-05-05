const { User, Task } = require('../models/index')

class Controller {
  static postTask(req, res, next) {
    let inputData = {
      title: req.body.title,
      UserId: req.decoded.id
    }
    Task
      .create(inputData)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
  static getTask(req, res, next) {
    Task
      .findAll({
        include: {
          model: User
        }
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
  static getTaskById(req, res, next) {
    let checkParams = req.params.id
    Task
      .findOne({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }
  static putTask(req, res, next) {
    let checkParams = req.params.id
    let inputData = {
      title: req.body.title
    }
    Task
      .update(inputData, {
        where: {
          id: +checkParams
        },
        returning: true
      })
      .then((data) => {
        res.status(200).json(data[1][0])
      })
      .catch((err) => {
        console.log(err);
        next(err)
      })
  }
  static patchTask(req, res, next) {
    let checkParams = req.params.id
    let inputData = {
      category: req.body.category
    }
    Task
      .update(inputData, {
        where: {
          id: +checkParams
        },
        returning: true
      })
      .then((data) => {
        res.status(200).json(data[1][0])
      })
      .catch((err) => {
        next(err)
      })
  }
  static deleteTask(req, res, next) {
    let checkParams = req.params.id
    Task
      .destroy({
        where: {
          id: +checkParams
        }
      })
      .then((data) => {
        res.status(200).json('todo success to delete')
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller