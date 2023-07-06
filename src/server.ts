import { app } from "./app";
import { AppDataSource } from "./data-source";
import 'dotenv/config'

export const baseUrl = 'http://localhost:3001' 

AppDataSource.initialize()
    .then(() => {
        console.log("Database Connected");

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        })
    }).catch((err: unknown) => {
        console.log(err);
    })

