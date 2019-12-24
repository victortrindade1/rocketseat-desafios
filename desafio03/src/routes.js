import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistryController from './app/controllers/RegistryController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// authMiddleware -> Verifica se é admin. Somente admin possui token hash
routes.use(authMiddleware);

// UserController
routes.post('/users', UserController.store);

// StudentController
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

// PlanController
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// RegistryController
routes.get('/registries', RegistryController.index);
routes.post('/registries', RegistryController.store);
routes.put('/registries/:id', RegistryController.update);
routes.delete('/registries/:id', RegistryController.delete);

export default routes;
