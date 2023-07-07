import dotenv from 'dotenv'
dotenv.config()

/*
    & Segun la documencation: https://sequelize.org/docs/v6/getting-started/#terminology-convention
        es necesario importarlo con MAYUSCULA       */
import Sequelize from 'sequelize'


/*
    & Segun la doc: https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
        seguimos la opcion 3            */
export const sequelize_connection = new Sequelize(
    process.env.DB_DATABASE,     // db name   
    process.env.DB_USERNAME,     // user 
    process.env.DB_PASSWORD,     // passwd
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres'
    }
)