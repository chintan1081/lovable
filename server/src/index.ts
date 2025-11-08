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
    s3GetObject("sd")
//         const projectId = req.params.projectId;
//         if(!projectId) return;
//     const fileStructure = await s3GetFileStructure(projectId);
//     res.status(200).json({
//         success: true,
//         message: "Conversation found successfully",
//         data: JSON.stringify(fileStructure)
//     })
    // s3PutObject("test1")
    // s3ListObject("projectId");
    // // const { prompt } = req.body;
    // const prompt = req.params.prompt;
    // const sandbox = await Sandbox.create('ce50a2e02xkmkz0igbf3')

    // const host = sandbox.getHost(5173)

    // // TODO:  create sandbox for user
    // const prompt = "create a landing page for school it should mention all necessary details"
    // const openrouter = createOpenRouter({
    //     apiKey: process.env.OPENROUTER_API_KEY!,
    // });
    // const response = streamText({
    //     model: openrouter("gpt-4o-mini"),
    //     tools: {
    //         createFile: createFile(sandbox),
    //         updateFile: updateFile(sandbox),
    //         deleteFile: deleteFile(sandbox),
    //         readFile: readFile(sandbox)
    //     },
    //     messages: [
    //         {
    //             role: "system",
    //             content: SYSTEM_PROMPT
    //         },
    //         {
    //             role: "user",
    //             content: prompt
    //         }
    //     ]
    });
    
    // console.log(`https://${host}`);
    // response.pipeTextStreamToResponse(res);
// });

webSocketService();

app.listen(port, () => {
    console.log(`Backend running on port running on ${port}`);
},)