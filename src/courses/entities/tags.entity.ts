/* eslint-disable prettier/prettier */

import  { Entity ,PrimaryGeneratedColumn,Column,ManyToMany, BeforeInsert, CreateDateColumn} from 'typeorm';
import { Course } from './courses.entity';
import { randomUUID } from 'node:crypto';

@Entity('tags')
export class Tag{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToMany(() => Course,course => course.tags )
    courses:Course[]

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