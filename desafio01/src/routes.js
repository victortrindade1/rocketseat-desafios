import { Router } from "express";

// Controllers
import ProjectController from "./app/controllers/ProjectController";
import TaskController from "./app/controllers/TaskControllers";

// Middlewares
import verifyIdExists from "./app/middlewares/verifyIdExistsMiddleware";
import countRequests from "./app/middlewares/countRequests";

const routes = new Router();

routes.use(countRequests);

// New project
routes.post("/projects", ProjectController.store);

// List all projects
routes.get("/projects", ProjectController.index);

// Update project
routes.put("/projects/:id", verifyIdExists, ProjectController.update);

// Delete project
routes.delete("/projects/:id", verifyIdExists, ProjectController.delete);

// New task
routes.post("/projects/:id/tasks", verifyIdExists, TaskController.store);

export default routes;
