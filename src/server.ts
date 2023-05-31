import { app } from "./app";
import { AppDataSource } from "./data-source";

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

