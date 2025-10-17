import { DataSource } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

 const AppDataSource = new DataSource({
    type: "postgres",
    schema: 'lovable',
    url: `${process.env.DATABASE_URL}`,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname + "/../entities/**/*.entity.{ts,js}")],
    migrations: [path.join(__dirname + "/../database/migrations/**/*.{ts,js}")],
})

export default AppDataSource;

export async function DbInitialization(){
    try {
        await AppDataSource.initialize()
        console.log("connected to database")
    } catch (error) {
        console.error("Error during Data Source initialization", error)
    }
}