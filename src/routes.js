const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const UserController = require('./controllers/UserController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/auth/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/auth/login',
    AuthenticationController.login)

  app.post('/user',
    UserController.getPublicUser)
  app.get('/user/private/:id',
    isAuthenticated,
    UserController.getPrivateUser)
}
