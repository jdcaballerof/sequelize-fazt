import { Router } from 'express';
import { createProject, deleteProject, getProject, getProjects, getProjectsTasks, updateProject } from '../controllers/project.controllers.js';


const router = Router();


router.get( "/project",        getProjects);
router.post("/project",        createProject);
router.get( "/project/:id",    getProject);
router.patch( "/project/:id",  updateProject);
router.delete("/project/:id",  deleteProject);

router.get( "/project/:id/tasks",    getProjectsTasks);

export default router;