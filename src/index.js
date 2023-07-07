import app from "./app.js";
import { sequelize_connection as sequelize } from "./database/database.js";

import dotenv from 'dotenv'
dotenv.config()

// Para sequelize.sync({ force: true })
// import './models/Project.js';
// import './models/Tasks.js';


const PORT = process.env.APP_PORT


/*
    & Siguiendo la doc: https://sequelize.org/docs/v6/getting-started/#testing-the-connection
      Se engloba todo en una func para poder hacer un try catch    */
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // await sequelize.sync({ alter: true })
    
    app.listen(PORT)
    console.log('Server is listening in port: ' + PORT);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}



main();