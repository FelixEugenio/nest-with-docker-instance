/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly coursesRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){}
    
     async findAll(){
        return this.coursesRepository.find()
     }
    
    async findOne(id:number){
      const course =  await this.coursesRepository.findOne({
        where:{id} //short syntax
      })
      if(!course){
        throw new HttpException(`Curso ID ${id} not found`,HttpStatus.NOT_FOUND)
      }
      return course
     }
    
   async  create(createCourseDTO:CreateCourseDTO){
    const tags = await Promise.all(
        createCourseDTO.tagas.map(name => this.preloadTagByName(name))
    )
    const course = this.coursesRepository.create({
        ...createCourseDTO,
        tags
    })
    return this.coursesRepository.save(course)
    }
    
    async update(id:number, updateCourseDTO:UpdateCourseDTO){
        const tags =
         updateCourseDTO.tagas && 
        (await Promise.all(
            updateCourseDTO.tagas.map(name => this.preloadTagByName(name))
        ))
     const course = await this.coursesRepository.preload({
        ...updateCourseDTO,
        id,
        tags
     }) // faz a busca e ja cria o objecto

     if(!course){
        throw new HttpException(`Curso ID ${id} not found`,HttpStatus.NOT_FOUND)  
     }

     return this.coursesRepository.save(course)
    }
    
   async remove(id:number){
    const course = await this.coursesRepository.findOne({
    where:{id}
    }) 

    if(!course){
        throw new HttpException(`Curso ID ${id} not found`,HttpStatus.NOT_FOUND)  
     }

     return this.coursesRepository.remove(course)

    }

    private async preloadTagByName(name: string):Promise<Tag>{
        const tag = await this.tagRepository.findOne({where:{name}})

        if(tag){
            return tag
        }

        return this.tagRepository.create({name})
    }
    
}
