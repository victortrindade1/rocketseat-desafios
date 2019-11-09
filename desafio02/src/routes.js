import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// authMiddleware -> Verifica se é user admin

// Novo usuário administrador
routes.post('/users', authMiddleware, UserController.store);

// Novo estudante
routes.post('/students', authMiddleware, StudentController.store);

// Atualiza estudante
routes.put('/students/:id', authMiddleware, StudentController.update);

export default routes;
