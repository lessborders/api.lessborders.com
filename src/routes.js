import express from 'express';

import AuthenticationController from './controllers/AuthenticationController'
import AuthenticationControllerPolicy from './policies/AuthenticationControllerPolicy'
import UserController from './controllers/UserController'
import isAuthenticated from './policies/isAuthenticated'

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