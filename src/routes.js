// Use controller to declare all endpoints associated with that controller
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const UserController = require('./controllers/UserController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  // A login endpoint which calls the AuthenticationController.login method
  app.post('/login',
    AuthenticationController.login)

  app.get('/user/:id',
    UserController.getUser)
  app.get('/users',
    isAuthenticated,
    UserController.index)
}
