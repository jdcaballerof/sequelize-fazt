import {DataTypes} from 'sequelize';
import { sequelize_connection as seq } from '../database/database.js';
import { Tasks } from './Tasks.js';


/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/core-concepts/model-basics/
        asi se define el esquema de una tabla
        Dentro de esa pagina se encuentra los diferentes Datatypes disponibles (/#data-types)
    (Se importa en index para que cree la tabla)
*/
export const Project =  seq.define(
    'projects',     // nombre de la tabla
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
        },
        priority:{
            type: DataTypes.INTEGER,
        },
        desc:{
            type: DataTypes.STRING
        },
    }
)


/*
    & Definiendo la relacion con la tabla Tasks
        Project hasMany Tasks            */ 
Project.hasMany(Tasks, {
    //? Crear/usar la col para la foreignKey en Tasks llamada projectId
    foreignKey: 'projectId',
    //? Estará enlazado projectId con la col 'id' de Project (de Project a Tasks)
    sourceKey: 'id'
})

/*
 & Tasks pertenece a Project  */ 
Tasks.belongsTo(Project, {
    //? Crear/usar la col para la foreignKey en Tasks llamada projectId
    foreignKey: 'projectId',
    //? Estará enlazado projectId con la col 'id' de Project (de Tasks a Project)
    targetId: 'id'
})


