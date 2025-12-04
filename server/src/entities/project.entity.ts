import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Conversation } from "./conversation.entity";
import { FileStructure } from "./fileStructure.entity";

@Entity()
export class Project{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    initialPrompt: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.projects)
    user: User

    @OneToMany(() => Conversation, (conversation) => conversation.project)
    conversations: Conversation

    @OneToMany(() => FileStructure, fileStructure => fileStructure.project)
    fileStructure: FileStructure

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}