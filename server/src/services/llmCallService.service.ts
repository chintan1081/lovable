import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { createFile, updateFile, deleteFile, readFile } from "../tools/index";
import { Sandbox } from '@e2b/code-interpreter';
import { SYSTEM_PROMPT } from '../prompts';
import { Project } from '../entities/project.entity';
import { findPreviousChatMsgService } from './findPreviousChatMsg.service';
import { conversationService } from './conversation.service';
import { ConversationMessageFrom, ConversationType } from '../entities/conversation.entity';
import { wsSendToClient } from './webSocket.service';

export const llmCallService = async (project: Project, prompt: string) => {
    const sandbox = await Sandbox.create('ce50a2e02xkmkz0igbf3')
    
    const host = sandbox.getHost(5173)

    // const prompt = "create a landing page for school it should mention all necessary details"
    const openrouter = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const prevMessage = await findPreviousChatMsgService(project.id);

    const response = streamText({
        model: openrouter("gpt-4o-mini"),
        tools: {
            createFile: createFile(sandbox, project),
            updateFile: updateFile(sandbox, project),
            deleteFile: deleteFile(sandbox, project),
            readFile: readFile(sandbox, project),
        },
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            ...prevMessage,
            {
                role: "user",
                content: prompt
            }
        ]
    });

    for await (const delta of response.textStream) {
        wsSendToClient({
            projectId: project.id,
            type: "stream",
            data: delta
        })
        process.stdout.write(delta);
    }

    const content = response && await response?.content;
    if (response && content) {
        if (content[0]?.type === "text") {
            await conversationService(
                project,
                ConversationType.TEXT_MESSAGE,
                ConversationMessageFrom.ASSISTANT,
                content[0].text
            );
        }
    }

    wsSendToClient({
        projectId: project.id,
        type: "sandboxUrl",
        data: {
            url: `https://${host}`
        }
    });

    return response;
}