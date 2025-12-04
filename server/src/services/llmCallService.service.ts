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
import sandboxService from './sandbox.service';

export const llmCallService = async (project: Project, prompt: string) => {
    const { host, sandbox } = await sandboxService(project.id);
    const openrouter = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const prevMessage = await findPreviousChatMsgService(project.id);

    const response = streamText({
        model: openrouter("gpt-4.1"),
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
        data: `https://${host}`
    });

    return response;
}