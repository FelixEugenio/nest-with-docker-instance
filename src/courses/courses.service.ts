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
        return this.coursesRepository.find({
            relations:['tags']
        })
     }
    
    async findOne(id:string){
      const course =  await this.coursesRepository.findOne({
        where:{id} ,
        relations:['tags']//short syntax
      })
      if(!course){
        throw new HttpException(`Curso ID ${id} not found`,HttpStatus.NOT_FOUND)
      }
      return course
     }
    
   async  create(createCourseDTO:CreateCourseDTO){
    const tags = await Promise.all(
        createCourseDTO.tags.map(name => this.preloadTagByName(name))
    )
    const course = this.coursesRepository.create({
        ...createCourseDTO,
        tags
    })
    return this.coursesRepository.save(course)
    }
    
    async update(id:string, updateCourseDTO:UpdateCourseDTO){
        const tags =
         updateCourseDTO.tags && 
        (await Promise.all(
            updateCourseDTO.tags.map(name => this.preloadTagByName(name))
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
    
   async remove(id:string){
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
