/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

    constructor(private readonly courseService:CoursesService){}

    @Get()
    findAll(){
        return this.courseService.findAll()
    }

    /*
    @Get(':id')
    findOne(@Param() params){
     return `Curso ${params.id}`;
    }
     */

    @Get(':id')
    findOne(@Param('id') id:number){
     return this.courseService.findOne(id);
    }

/*
    @Get(':id/:name')
    findOne(@Param('id') id: string ,@Param('name') name: string){
     return `Curso ${id} - Nome ${name} `;
    }
     */

    @HttpCode(200)
    @Post()
    createUser(@Body() createCourseDTO: CreateCourseDTO){
        return this.courseService.create(createCourseDTO);
    }

    @Put(':id')
    update(@Param('id') id: number ,@Body() updateCourseDTO:UpdateCourseDTO){
        return this.courseService.update(id,updateCourseDTO);
    }

    @HttpCode(200)
    @Delete(':id')
    remove(@Param('id') id:number){
        return this.courseService.remove(id);
    }
}

