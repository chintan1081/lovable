import express from "express";
import "dotenv/config";
import cors from "cors";
import AuthController from "./controllers/auth.controller"
import ProjectController from "./controllers/project.controller"
import { DbInitialization } from "./config/db.config";
import 'reflect-metadata';

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

DbInitialization();

app.use("/v0/api/auth", AuthController);
app.use("/v0/api", ProjectController)

app.listen(port, () => {
    console.log(`Backend running on port running on ${port}`);
},)