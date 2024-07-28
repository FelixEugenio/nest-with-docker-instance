/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1722203481730 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('create extension if not exists "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name:'courses',
            columns:[
                {
                   name:'id',
                   type:'uuid',
                   isPrimary:true
                },
                {
                    name:'name',
                    type:'varchar'
                },
                {
                    name:'description',
                    type:'varchar'
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
        await queryRunner.dropTable('courses')
    }

}
