const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../middlewares/authenticate')
const { OAuth2Client } = require('google-auth-library')

class Controller {
  static register(req, res, next) {
    let inputData = {
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(inputData)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((err) => {
        next(err)
      })
  }

  static login(req, res, next) {
    let inputData = {
      email: req.body.email,
      password: req.body.password
    }
    User
      .findOne({
        where: {
          email: inputData.email
        }
      })
      .then((data) => {
        if (!data) throw { name: 'customError', msg: 'Invalid email or password' }
        let comparePass = comparePassword(inputData.password, data.password)
        if (!comparePass) throw { name: 'customError', msg: 'Invalid email or password' }
        let accessToken = createToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({ accessToken })
      })
      .catch((err) => {
        next(err)
      })
  }

  static loginGoogleHandler(req, res, next) {
    let { id_token } = req.body
    console.log(id_token, "id token")
    const client = new OAuth2Client('109984424561-97edhu97887mh6b18qpumu8mknuvomhv.apps.googleusercontent.com')

    let payload = null
    //console.log(masukkk====>)
    client.verifyIdToken({
      idToken: id_token,
      audience: '109984424561-97edhu97887mh6b18qpumu8mknuvomhv.apps.googleusercontent.com'
    })
      .then(ticket => {
        //console.log(ticket)
        payload = ticket.getPayload()
        return User.findOne({ where: { email: payload.email } })
      })
      .then(user => {
        //console.log(user)
        if (!user) {
          //console.log(masukkk====>)
          return User.create({
            email: payload.email,
            name: payload.name,
            password: Math.floor(Math.random() * 1000) + 'iniDariGoogle'
          })
        } else {
          return user
        }
      })
      .then(user => {
        let googleSign = {
          id: user.id,
          email: user.email
        }
        let accessToken = createToken(googleSign)
        return res.status(200).json({ accessToken })
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = Controller