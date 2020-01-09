import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistryController from './app/controllers/RegistryController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswersQueueController from './app/controllers/AnswersQueueController';

const routes = new Router();

/**
 * Sessions
 */
routes.post('/sessions', SessionController.store);

/**
 * Checkins
 */
routes.post('/students/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

/**
 * Help Orders
 */
routes.post('/students/:student_id/help-orders', HelpOrderController.store);
routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.put(
  '/help-orders/:id/answer',
  authMiddleware,
  HelpOrderController.update
);

/**
 * authMiddleware: only logged user has token (admin area)
 */
routes.use(authMiddleware);

/**
 * UserController
 */
routes.post('/users', UserController.store);

/**
 * StudentController
 */
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

/**
 * PlanController
 */
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

/**
 * RegistryController
 */
routes.get('/registries', RegistryController.index);
routes.post('/registries', RegistryController.store);
routes.put('/registries/:id', RegistryController.update);
routes.delete('/registries/:id', RegistryController.delete);

/**
 * Help Orders not answered
 */
routes.get('/help-orders/answers-queue', AnswersQueueController.index);

export default routes;
