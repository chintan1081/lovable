import { Router } from "express";
import AppDataSource from "../config/db.config";
import { Project } from "../entities/project.entity";
import { promptSchema } from "../types";
import { User } from "../entities/user.entity";
import { conversationService } from "../services/conversation.service";
import { Conversation, ConversationMessageFrom, ConversationType } from "../entities/conversation.entity";
import { llmCallService } from "../services/sandbox.service";

const router = Router();

const projectRepo = AppDataSource.getRepository(Project);
const userRepo = AppDataSource.getRepository(User);
const conversationrepo = AppDataSource.getRepository(Conversation);

router.post('/project', async (req, res) => {
    const { success, data } = promptSchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Input parameters incorrect"
        });
        return;
    }

    const userId = (req as any).userId
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User doesn't exist"
        })
        return
    }

    const project = projectRepo.create({
        title: data?.prompt,
        initialPrompt: data?.prompt,
        userId,
        user
    });

    await projectRepo.save(project);
    res.status(200).json({
        success: true,
        message: "Project created successfully",
        data: project
    })
});

router.get('/projects', async (req, res) => {
    const { success, data } = promptSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            success: false,
            message: "Input parameters are incorrect"
        });
        return
    }

    const userId = (req as any).userId;
    if (!userId) {
        res.status(404).json({
            success: false,
            message: "Projects doesn't exist"
        });
        return;
    }

    const projects = await projectRepo.find({
        where: {
            user: {
                id: userId
            }
        }
    });
    res.status(200).json({
        success: true,
        message: "Projects found successfully",
        data: projects
    })
})

router.get('/project/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    const project = await projectRepo.findOne({
        where: {
            id: projectId
        },
        relations: ["conversations"],
        order: {
            createdAt: "DESC"
        }
    });

    if (!project) {
        res.status(411).json({
            success: false,
            message: "Project doesn't exist"
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Project found successfully",
        data: project
    })
})

router.post('/project/conversation/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    const project = await projectRepo.findOne({ where: {
        id: projectId
    }})

    if(!project){
        res.status(411).json({
            success: false,
            message: "Project doesn't exist"
        });
        return
    }

    const { success, data } = promptSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            success: false,
            message: "Input parameters incorrect"
        });
        return
    }

    const conversation = await conversationService(
        project,
        ConversationType.TEXT_MESSAGE,
        ConversationMessageFrom.USER,
        data.prompt,
    );

    await llmCallService(project, data.prompt);

    res.status(200).json({
        success: true,
        message: "Conversation created successfully",
        data: conversation
    })
});

router.get('/project/conversation/:projectId', async(req, res) => {
    const projectId = req.params.projectId;
    const conversation = await conversationrepo.find({
        where: {
            projectId
        }
    });
    
    if(!conversation){
        res.status(411).json({
            success: false,
            message: "Conversation doesn't exist"
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Conversation found successfully",
        data: conversation
    })
});

export default router;