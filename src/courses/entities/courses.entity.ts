/* eslint-disable prettier/prettier */

import  { Entity ,PrimaryGeneratedColumn,Column,ManyToMany,JoinTable, BeforeInsert, CreateDateColumn} from 'typeorm';
import { Tag } from './tags.entity';
import { randomUUID } from 'node:crypto';

@Entity('courses')
export class Course{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @JoinTable()
    @ManyToMany(() => Tag,tag => tag.courses,{
        cascade:true
    })
    tags: Tag[]

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @BeforeInsert() // sera executado sempre antes de inserir um registro na base dados 
    generatedId(){
        if(this.id){
            return
        }
        this.id = randomUUID()
    }
}