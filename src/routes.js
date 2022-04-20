import express from 'express';

import AuthenticationController from './controllers/AuthenticationController.js'
import AuthenticationControllerPolicy from './policies/AuthenticationControllerPolicy.js'
import UserController from './controllers/UserController.js'
import isAuthenticated from './policies/isAuthenticated.js'

var router = express.Router();

router.post('/auth/register',
            AuthenticationControllerPolicy.register,
            AuthenticationController.register)
router.post('/auth/login',
            AuthenticationController.login)
router.post('/user',
            UserController.getPublicUser)

router.get('/user/private/:id',
            isAuthenticated,
            UserController.getPrivateUser)

export default router;