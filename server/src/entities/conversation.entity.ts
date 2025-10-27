import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

export enum ConversationType {
    TOOL_CALL= "TOOL_CALL",
    TEXT_MESSAGE= "TEXT_MESSAGE"
} 

export enum ConversationMessageFrom {
    USER= "USER",
    ASSISTANT= "ASSISTANT"
} 

export enum ConversationToolCall {
    READ_FILE= "READ_FILE",
    UPDATE_FILE= "UPDATE_FILE",
    DELETE_FILE= "DELETE_FILE",
    WRITE_FILE= "WRITE_FILE"
} 

@Entity()
export class Conversation{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    projectId: string;

    @ManyToOne(() => Project, (project) => project.conversations)
    project: Project;
    
    @Column({ type: "enum", enum: ConversationType, default: null })
    type: ConversationType;

    @Column({ type: "enum", enum: ConversationMessageFrom, default: null })
    messageFrom: ConversationMessageFrom;

    @Column()
    contents: string;

    @Column({ type: "boolean", default: false })
    hidden: boolean;

    @Column({ type: "jsonb"})
    toolMetadata: string;

    @Column({ type: "enum", enum: ConversationToolCall, default: null })
    toolCall: ConversationToolCall;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}