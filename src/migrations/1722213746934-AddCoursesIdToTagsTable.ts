/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCoursesIdToTagsTable1722213746934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags_tags',
            new TableColumn({
            name:'coursesId',
            type:'uuid',
            isNullable:true
        }))

        await queryRunner.createForeignKey('courses_tags_tags',new TableForeignKey({
            name:'courses_tags_courses',
            columnNames:['coursesId'],
            referencedTableName:'courses',
            referencedColumnNames:['id'],
            onDelete:'set null'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags_tags','courses_tags_courses')
        await queryRunner.dropColumn('courses_tags_tags','coursesId')
    }

}
