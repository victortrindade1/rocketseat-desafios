import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// authMiddleware -> Verifica se é user admin
routes.post('/users', authMiddleware, UserController.store);

export default routes;
