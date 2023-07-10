import { app } from "./app";
import { AppDataSource } from "./data-source";
import 'dotenv/config'
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export const baseUrl = 'http://localhost:3001' 

AppDataSource.initialize()
    .then(() => {
        console.log("Database Connected");

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        })
    }).catch((err: unknown) => {
        console.log(err);
    })
