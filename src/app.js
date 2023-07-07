import express from 'express'
import projectRoutes from './routes/projects.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express()

// middlewares
//Para poder leer los JSON del body 
app.use( express.json() )

// Rutas
app.use(projectRoutes)
app.use(tasksRoutes)



export default app