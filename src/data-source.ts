import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config"

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**{js,ts}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**{js,ts}"); 

    const dbUrl: string | undefined = process.env.DATABASE_URL;
    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if(!dbUrl || nodeEnv == "test") {
        console.log("Using SQLITE3 database. Tip: Check if your .env file has DATABASE_URL and NODE_ENV as dev to use postgresSQL");
        return {
            type: 'sqlite',
            database: 'SQLITE3.db',
            synchronize: true,
            entities: [entitiesPath],
            migrations: [migrationsPath]
        };
    }

    return{
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    }
}

export const AppDataSource = new DataSource(dataSourceConfig());