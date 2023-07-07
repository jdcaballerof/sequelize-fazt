## Init
- `npm init -y` para crear package.json
- Instalar dependencias
- Configurar en el package.json el script `"dev": "nodemon src/index.js"`
- Empezar por el archivo **src/index.js**

## Dependencias
```JSON
"dependencies": {
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "morgan": "^1.10.0",
    "pg": "^8.11.1",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.32.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
```

## Inicializacion y conexion a DB
Todo empieza por el archivo app.js 

```javascript
import express from 'express'  
const app = express()
export default app
```

Para la conexion con la DB se usa **sequelize** en database.js
- Segun la doc [^terminology-convention] es necesario importarlo con MAYUSCULA
- Segun la doc [^connecting-database], se sigue la opcion 3

```javascript
import Sequelize from 'sequelize'

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
```

Teniendo al final el index.js, donde Siguiendo la doc [^testing-connection] se engloba todo en una func para poder hacer un try-catch async

```javascript
import app from "./app.js";
import { sequelize_connection } from "./database/database.js";

const PORT = process.env.APP_PORT

const main = async () => {
  try {
    await sequelize_connection.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT)
    console.log('Server is listening in port: ' + PORT);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
```

#### Test 1
Para correr el programa se abre una consola y se ejecuta `npm run dev`, si todo funciono bien da la sig resp:

```
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
Server is listening in port: 4020
```

#### Que sigue?
Realizar
1. models,
2. rutas, 
3. Middlewares
4. controladores
5. (relaciones de tablas)
6. middlewares (en app.js), 
7. etc.

---

## Models

El modelado de datos (relacion de tablas)
![Relacion de tablas](https://github.com/FaztWeb/nodejs-sequelize-restapi-postgres/raw/master/docs/diagram.png "Relacion de tablas")
<center> <i> 1 proyect tienen muchas task's </i> </center>

ㅤ

Para ambos casos se usa el metodo *define* de sequelize el cual crea la tabla en la DB segun el esquema creado
1. Tasks
2. Project
   * Para `Project.model` ademas de definir el esquema se definen las relaciones entre las 2 tablas (***Project hasMany Tasks*** & ***Tasks pertenece a Project*** [^TasksBelongToProject] )

## Rutas
Son rutas normales de express donde al consultar un path ejecuta una función
En el caso de `Project.routes` por buenas practicas es donde se coloca la ruta para obtener todas las tareas de un proyecto `router.get( "/project/:id/tasks",    getProjectsTasks);
`  

## Middlewares
Se usan en app.js y en las rutas
1. Para poder leer los JSON del body 
  `app.use( express.json() )`
2. No se ocuparon en este proyecto. En las rutas son funciones `(req, res, next) => {}` que se ejecutaran antes de los controladores, si todo es valido continua con `next()`, si algo falla arrojar un error
   * Ejemplo: 
   ```javascript
   router.patch(
      '/:id',                                           // Path
      validaNoIncap,                                    // Middleware 1
      validatorHandler(getAusenciaSchema, 'params'),    // Middleware 2
      validatorHandler(updateAusenciaSchema, 'body'),   // Middleware 3
      updateAusencia                                    // Controller  
    ); 
   ```

   validatorHandler es una funcion que retorna la funcion `(req, res, next) => {}`

   ```javascript
    const boom = require('@hapi/boom');

    type Property = 'body' | 'params' | 'query'   // Si se usa TS
    type Joi = Joi.object                         // libreria de Joi

    function validatorHandler(schema: Joi, property: Property ) {
      return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
          next(boom.badRequest(error));     // tambien se puede usar  res.status(500).json({msg: error.message})
        }
        next();
      }
    }
   ```


## Controladores

Conjunte la parte de **service** con **controllers**. Realizando primero para Project y luego para Tasks


## Interaccion de Router - Controller - Service
1. **Router**
   Define que Middlewares y Controller se ejecutarán al consultar el path
2. **Controlller**
   Coordina la solicitud, define que servicios [^services] usar y construye la respuesta para enviar
3. **Service**
   Encapsula la lógica de negocio y se encarga de realizar operaciones relacionadas con la manipulación y gestión de datos.

Ver mas en   [Router_Controller_Service][nombre de tu referencia]

[nombre de tu referencia]: Doc\routerControllerService.md

---
##  Saber mas
Info obtenida de Fer Herrera: 
    - Video 1 TS rest server: https://www.youtube.com/watch?v=yC18hkVZ3BM&list=PLCKuOXG0bPi3nKe-CHNQ5jwJ5V4SR77yd&index=1
    - Video 2 Nodemon y TSC watch: https://www.youtube.com/watch?v=Ayawev13wBY&list=PLCKuOXG0bPi3nKe-CHNQ5jwJ5V4SR77yd&index=3 
    - Es recomendable instalar TS de manera global (`npm i -g typescript`) y en cada proyecto (sin -g y en la carpeta del proyecto)
    - Crear archivo de configuración `tsc --init`
    - Para utilizar `export` e `import` añadir en el package.json `"type": "module"`, el detalle es que es necesario especificar el tipo de archivo




[^terminology-convention]: terminology-convention:  https://sequelize.org/docs/v6/getting-started/#terminology-convention

[^connecting-database]: connecting-to-a-database: https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database

[^testing-connection]: testing-the-connection https://sequelize.org/docs/v6/getting-started/#testing-the-connection

[^TasksBelongToProject]: Aunque se define en el mismo archivo por fines educativos es mejor practica colocarlo en su respectivo archivo (Tasks.model)  

[^services]: Los ***Services*** encapsulan la lógica de negocio y proporciona funcionalidad para interactuar con los datos
ㅤ ㅤ ㅤ