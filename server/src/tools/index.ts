import { z } from "zod";
import { tool } from "ai";
import { Sandbox } from "@e2b/code-interpreter";
import { uploadSingleFile } from "../services/s3PutGet.service";
import { conversationService } from "../services/conversation.service";
import { Project } from "../entities/project.entity";
import { ConversationMessageFrom, ConversationToolCall, ConversationType } from "../entities/conversation.entity";

// export const createFile = (sandbox: Sandbox, project: Project) => tool({

export const createFile = (sandbox: Sandbox, project: any) => tool({
  description: 'Create a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
    content: z.string().describe('Content of the file'),
  }),
  execute: async ({ location, content }: { location: string, content: string }) => {
    await sandbox.files.write(location, content);
    const toolMetadata = {
      location,
      returnContent: "File created"
    }

    await conversationService(
      project,
      ConversationType.TOOL_CALL,
      ConversationMessageFrom.ASSISTANT,
      content,
      ConversationToolCall.UPDATE_FILE,
      toolMetadata,
      true
    );

    const newPath = location.split("/").splice(3).join("/");
    
    await uploadSingleFile(`${project.id}/${newPath}`, content);

    return `File created`;
  },
});

export const updateFile = (sandbox: Sandbox, project: any) => tool({
  description: 'Update a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
    content: z.string().describe('Content of the file'),
  }),
  execute: async ({ location, content }: { location: string, content: string }) => {

    await sandbox.files.write(location, content);

    const toolMetadata = {
      location,
      returnContent: "File updated"
    };

    await conversationService(
      project,
      ConversationType.TOOL_CALL,
      ConversationMessageFrom.ASSISTANT,
      content,
      ConversationToolCall.UPDATE_FILE,
      toolMetadata,
      true
    );

    const newPath = location.split("/").splice(3).join("/");
    console.log(newPath, location,"./////////////////////parh");
    
    await uploadSingleFile(`${project.id}/${newPath}`, content);

    return `File updated`;
  },
});

export const deleteFile = (sandbox: Sandbox, project: any) => tool({
  description: 'Delete a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
  }),
  execute: async ({ location }: { location: string }) => {
    return `File deleted`;
  },
});

export const readFile = (sandbox: Sandbox, project: any) => tool({
  description: 'Read a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
  }),
  execute: async ({ location }: { location: string }) => {
    const fileContent = await sandbox.files.read(location)
    return fileContent;
  },
});

// export const assistantRes = (project: Project) => tool({
//   description: `Summarize the assistant's recent work or actions in **less than 30 words**.
//   Call this tool when a brief explanation of what has been done is required.
//   Input: "content" = description of the work completed.
//   Output: short summary sentence.`,
//   inputSchema: z.object({
//     content: z.string().describe('Details of the task/work performed'),
//   }),
//   execute: async ({ content }: { content: string }) => {
//     console.log(content, '...........content');
//     await conversationService(
//       project,
//       ConversationType.TEXT_MESSAGE,
//       ConversationMessageFrom.ASSISTANT,
//       content,
//     );

//     return `assistent`;
//   },
// });
