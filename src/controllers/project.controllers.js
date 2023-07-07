import { Project } from "../models/Project.js";
import { Tasks } from "../models/Tasks.js";


export const getProjects = async(req, res) => {

    try {
        const projects = await Project.findAll()
        res.send(projects)

    } catch (error) {
        console.log('error in get all projects controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const getProject = async(req, res) => {

    const { id } = req.params

    try {
        const project = await Project.findOne({
            where: {
                id
            }
        })
        res.send(project)

    } catch (error) {
        console.log('error in get one projects controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const createProject = async(req, res) => {

    const { name, priority, desc } = req.body;

    try {
        const newProject = await Project.create( { name, priority, desc } )

        console.log('send', req.body);
        console.log('res', newProject);     // dataValues
        res.send(newProject)

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const updateProject = async(req, res) => {
    const { id } = req.params
    const { name, priority, desc } = req.body

    try {
        // const project = await Project.findByPk(id)
        // project.name = name
        // project.priority = priority
        // project.desc = desc
        // await project.save
        
        // console.log(req.body);
        // res.send(['update', project])

        const isUpdated = await Project.update({ name, priority, desc }, {
            where: { id }
        });
        const project = await Project.findByPk(id)

        res.send(['update', project])

    } catch (error) {
        console.log('error in patch projects controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const deleteProject = async(req, res) => {

    const { id } = req.params

    try {
        await Project.destroy({
            where: {
                id
            }
        })
        
        res.send('delete ' + id)
    } catch (error) {
        console.log('error in delete project controller', error);
        return res.status(500).json({msg: error.message})
    }
}


export const getProjectsTasks = async(req, res) => {
    
    const { id } = req.params
    const { done, name, id:idTask } = req.query
    console.log(done);

    let where = {}
    if(done) where = {...where, done}
    if(idTask) where = {...where, id: idTask}
    if(name) where = {...where, name}
    
    try {
        const project = await Project.findByPk(id,{
            include: [
                { 
                    model: Tasks,
                    where
                }
            ]
        })
        // const tasks = await Tasks.findAll({where: { projectId: id }})
        // res.send({ ...project?.dataValues, tasks })
        res.send(project)
        
    } catch (error) {
        console.log('error in get project tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}