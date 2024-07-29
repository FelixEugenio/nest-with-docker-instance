/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTagsTable1722213203990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('create extension if not exists "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name:'courses_tags',
            columns:[
                {
                   name:'id',
                   type:'uuid',
                   isPrimary:true,
                   generationStrategy:'uuid',
                   default:'uuid_generate_v4()' // deixando a responsabilidade de gerar uuid com o banco de dados 
                },
                
                {
                    name:'created_at',
                    type:'timestamp',
                    default:'current_timestamp'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses_tags')
    }

}
