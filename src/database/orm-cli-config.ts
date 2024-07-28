/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1722203481730 } from "src/migrations/1722203481730-CreateCoursesTable";
import { CreateTagsTable1722205782151 } from "src/migrations/1722205782151-CreateTagsTable";

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize:false,
    migrations:[CreateCoursesTable1722203481730,CreateTagsTable1722205782151],
})