import { Router } from 'express';
import { deleteTask, getTask, getTasks, postTask, updateTask } from '../controllers/tasks.controllers.js';


const router = Router();


router.get( "/tasks",        getTasks);
router.post("/tasks",        postTask);
router.get( "/tasks/:id",    getTask);
router.patch( "/tasks/:id",  updateTask);
router.delete("/tasks/:id",  deleteTask);


export default router;