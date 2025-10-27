import { Router } from "express";
import { S3Client, PutObjectCommand, GetObjectCommand, ListBucketsCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import z from "zod";
import AppDataSource from "../config/db.config";
import { Project } from "../entities/project.entity";

const s3 = new S3Client({ region: process.env.AWS_REGION! });
const router = Router();

const promptSchema = z.object({
    prompt: z.string()
})

const projectRepo = AppDataSource.getRepository(Project);

router.post('/project',(req, res) => {
    const { success, data } = promptSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Input parameters incorrect"
        });
        return;
    }

    const project  = projectRepo.create({
        title: data?.prompt,
        initialPrompt: data?.prompt
    })
});

router.get('/projects', (req, res) => {

})

router.get('/project/:projectId', (req, res) => {

})

router.post('/project/conversation/:projectId',(req, res) => {

});

router.get('/project/conversation/:projectId',(req, res) => {

});

export default router;