/* eslint-disable prettier/prettier */
import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1722203481730 } from "src/migrations/1722203481730-CreateCoursesTable";
import { CreateTagsTable1722205782151 } from "src/migrations/1722205782151-CreateTagsTable";
import { CreateCoursesTagsTable1722213203990 } from "src/migrations/1722213203990-CreateCoursesTagsTable";
import { AddCoursesIdToTagsTable1722213746934 } from "src/migrations/1722213746934-AddCoursesIdToTagsTable";
import { AddTagsIdToCousersTable1722214544975 } from "src/migrations/1722214544975-AddTagsIdToCousersTable";
import { Course } from "src/courses/entities/courses.entity";
import { Tag } from "src/courses/entities/tags.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER ,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course,Tag],
    synchronize: false,
  };
  

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize:false,
    migrations:[
        CreateCoursesTable1722203481730,
        CreateTagsTable1722205782151,
        CreateCoursesTagsTable1722213203990,
        AddCoursesIdToTagsTable1722213746934,
        AddTagsIdToCousersTable1722214544975
    ],
    
})