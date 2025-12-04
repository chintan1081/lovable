import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class FileStructure {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    path: string

    @Column()
    content: string

    @ManyToOne(() => Project, project => project.fileStructure,{ nullable: false })
    @JoinColumn()
    project: Project

    @CreateDateColumn()
    createAt: string
}