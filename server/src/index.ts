import express from "express";
import "dotenv/config";
import cors from "cors";
import AuthController from "./controllers/auth.controller"
import ProjectController from "./controllers/project.controller"
import { DbInitialization } from "./config/db.config";
import 'reflect-metadata';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from "./prompts";
import { createFile, updateFile, deleteFile, readFile } from "./tools";
import { Sandbox } from '@e2b/code-interpreter'
import AuthMiddleware from "./middleware/auth.middleware";
import http from "http";
import { s3GetObject, s3GetFileStructure } from "./services/s3PutGet.service";
import webSocketService from "./services/webSocket.service";

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

DbInitialization();

app.use("/v0/api/auth", AuthController);
app.use("/api/v0", AuthMiddleware, ProjectController);

app.get("/prompt", async (req, res) => {
    const sandbox = await Sandbox.create('ce50a2e02xkmkz0igbf3')

    const host = sandbox.getHost(5173)

    const prompt = "create todo list website with dark ui"
    const openrouter = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY!,
    });
    const response = streamText({
        model: openrouter("gpt-4o-mini"),
        temperature: 0.1,
        tools: {
            createFile: createFile(sandbox, "dd"),
            updateFile: updateFile(sandbox, "Fd"),
            deleteFile: deleteFile(sandbox, "Fd"),
            readFile: readFile(sandbox, "df")
        },
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });
    
    console.log(`https://${host}`);
    response.pipeTextStreamToResponse(res);
});

webSocketService();

app.listen(port, () => {
    console.log(`Backend running on port running on ${port}`);
},)