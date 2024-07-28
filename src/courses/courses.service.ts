/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
    constructor(
        private readonly coursesRepository: Repository<Course>
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
    
   async  create(createCourseDTO:any){
    const course = this.coursesRepository.create(createCourseDTO)
    return this.coursesRepository.save(course)
    }
    
    async update(id:number, updateCourseDTO:any){
     const course = await this.coursesRepository.preload({
        ...updateCourseDTO,
        id
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
    
}
