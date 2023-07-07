import {DataTypes} from 'sequelize';
import { sequelize_connection as seq } from '../database/database.js';

/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/core-concepts/model-basics/
        asi se define el esquema de una tabla
        Dentro de esa pagina se encuentra los diferentes Datatypes disponibles (/#data-types)
    (Se importa en index para que cree la tabla)
*/
export const Tasks =  seq.define(
    'tasks',     // nombre de la tabla
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
        },
        desc:{
            type: DataTypes.STRING,
        },
        owner:{
            type: DataTypes.STRING,
        },
        done:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
    },
    // { timestamps: false }        // para no crear las columnas de created_at y updated_at
)

