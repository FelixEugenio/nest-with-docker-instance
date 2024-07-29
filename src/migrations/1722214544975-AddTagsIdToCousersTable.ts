/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTagsIdToCousersTable1722214544975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags_tags',
            new TableColumn({
            name:'tagsId',
            type:'uuid',
            isNullable:true
        }))

        await queryRunner.createForeignKey('courses_tags_tags',new TableForeignKey({
            name:'courses_tags_tags',
            columnNames:['tagsId'],
            referencedTableName:'tags',
            referencedColumnNames:['id'],
            onDelete:'set null'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags_tags','courses_tags_tags')
        await queryRunner.dropColumn('courses_tags_tags','tagsId')
    }

}
