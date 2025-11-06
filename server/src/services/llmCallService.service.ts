import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { createFile, updateFile, deleteFile, readFile } from "../tools/index";
import { Sandbox } from '@e2b/code-interpreter';
import { SYSTEM_PROMPT } from '../prompts';
import { Project } from '../entities/project.entity';
import { findPreviousChatMsgService } from './findPreviousChatMsg.service';
import { conversationService } from './conversation.service';
import { ConversationMessageFrom, ConversationType } from '../entities/conversation.entity';

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

    // console.log(await response.content,'llm response');
    //     for await (const delta of response.textStream) {
    //   process.stdout.write(delta);
    // }

    console.log(response?.content, "llm");
    
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

    console.log(`https://${host}`);
    return response;
}