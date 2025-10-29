import { z } from "zod";
import { tool } from "ai";
import { Sandbox } from "@e2b/code-interpreter";

export const createFile = (sandbox: Sandbox) => tool({
  description: 'Create a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
    content: z.string().describe('Content of the file'),
  }),
  execute: async ({ location, content }: { location: string, content: string }) => {
    await sandbox.files.write(location, content);
    console.log(location,content,'...........createfile');
    
    return `File created`;
  },
});

export const updateFile = (sandbox: Sandbox) => tool({
  description: 'Update a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
    content: z.string().describe('Content of the file'),
  }),
  execute: async ({ location, content }: { location: string, content: string }) => {
    console.log(location,content,'...........update');
    await sandbox.files.write(location, content);
    return `File updated`;
  },
});

export const deleteFile = (sandbox: Sandbox) => tool({
  description: 'Delete a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
  }),
  execute: async ({ location }: { location: string }) => {
    return `File deleted`;
  },
});

export const readFile = (sandbox: Sandbox) => tool({
  description: 'Read a file at a certain directory',
  inputSchema: z.object({
    location: z.string().describe('Relative path to the file'),
  }),
  execute: async ({ location }: { location: string }) => {
    const fileContent = await sandbox.files.read(location)
    return fileContent;
  },
});
