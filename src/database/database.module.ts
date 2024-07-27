/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions:DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'nest',
    entities:[],
    synchronize:true


}

@Module({})
export class DatabaseModule {}
