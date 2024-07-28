/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1722203481730 } from "src/migrations/1722203481730-CreateCoursesTable";

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize:false,
    migrations:[CreateCoursesTable1722203481730],
})