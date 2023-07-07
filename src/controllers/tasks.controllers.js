import { Tasks } from "../models/Tasks.js";

export const getTasks = async(req, res) => {
    try {
        const tasks = await Tasks.findAll()
        // const tasks = await Tasks.findAll({
        //     where: {done: true},
        //     attributes: ['id', 'name']
        // })
        res.send(tasks)
        
    } catch (error) {
        console.log('error in get all tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const getTask = async(req, res) => {

    const { id } = req.params

    try {
        const task = await Tasks.findByPk(id);
        res.send(task);
        
    } catch (error) {
        console.log('error in get one tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const postTask = async(req, res) => {

    const { name, done, projectId, desc, owner } = req.body

    try {
        const newTask = await Tasks.create({name, done, projectId, desc, owner})
        res.send(newTask)
        
    } catch (error) {
        console.log('error in post tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const updateTask = async(req, res) => {

    const { id } = req.params

    try {
        const task = await Tasks.findByPk(id)
        task.set(req.body)
        await task.save()
        res.send(task)
        
    } catch (error) {
        console.log('error in update tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}

export const deleteTask = async(req, res) => {

    const { id } = req.params

    try {
        await Tasks.destroy({
            where: {id}
        })
        res.send('delete ' + id)
        
    } catch (error) {
        console.log('error in delete tasks controller', error);
        return res.status(500).json({msg: error.message})
    }
}