import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Verifica se já é usuário logado
routes.use(authMiddleware);

// aqui mais rotas

export default routes;
