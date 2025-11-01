import { z } from "zod";
import { tool } from "ai";
import { Sandbox } from "@e2b/code-interpreter";
import { uploadSingleFile } from "../services/s3PutGet.service";
import { conversationService } from "../services/conversation.service";
import { Project } from "../entities/project.entity";
import { ConversationMessageFrom, ConversationToolCall, ConversationType } from "../entities/conversation.entity";

export const createFile = (sandbox: Sandbox, project: Project) => tool({
  description: 'Create a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
    content: z.string().describe('Content of the file'),
  }),
  execute: async ({ location, content }: { location: string, content: string }) => {
    await sandbox.files.write(location, content);
    console.log(location, '...........createfile');

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

    await uploadSingleFile(`${project.id}/${location}`, content)

    return `File created`;
  },
});

export const updateFile = (sandbox: Sandbox, project: Project) => tool({
  description: 'Update a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
    content: z.string().describe('Content of the file'),
  }),
  execute: async ({ location, content }: { location: string, content: string }) => {
    console.log(location, '...........update');

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

    await uploadSingleFile(`${project.id}/${location}`, content);

    return `File updated`;
  },
});

export const deleteFile = (sandbox: Sandbox, project: Project) => tool({
  description: 'Delete a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
  }),
  execute: async ({ location }: { location: string }) => {
    return `File deleted`;
  },
});

export const readFile = (sandbox: Sandbox, project: Project) => tool({
  description: 'Read a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
  }),
  execute: async ({ location }: { location: string }) => {
    const fileContent = await sandbox.files.read(location)
    return fileContent;
  },
});
