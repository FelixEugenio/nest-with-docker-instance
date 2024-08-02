/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './entities/courses.entity';
import { Tag } from './entities/tags.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';


describe('CoursesService unit test', () => {
  let service: CoursesService;
  let id: string
  let created_at: Date
  let expectOutputTags :any
  let expectOutputCourses:any
  let mockCourseRepository:any
  let mockTagRepository:any
 
  beforeEach(async () => {
    service = new CoursesService()
    id = randomUUID()
    created_at = new Date()
    expectOutputTags = [
        {
            id,
            name: 'Node.Js',
            created_at,
        }
    ],

    expectOutputCourses= [
        {
            id,
            name: 'test name',
            description:'test description',
            created_at,
            tags:expectOutputTags
        },

        mockCourseRepository = {
           create:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
            save:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
            update:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
            findAll:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
            preload:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
            find:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
            findOne:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
            remove:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
        },

        mockTagRepository = {
            create:jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
            findOne:jest.fn()
        }
    ]
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(' should create a course', async() => {

    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const createCourseDTO: CreateCourseDTO = {
            name: 'test name',
            description:'test description',
            tags:['Node.Js'],
    }

    const newCourse = await service.create(createCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse)
  });


  it(' should list all courses', async() => {

    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses)
  });

  it(' should list one course', async() => {

    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  });

  it(' should update a course', async() => {

    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const updateCourseDTO: UpdateCourseDTO = {
            name: 'test name',
            description:'test description',
            tags:['Node.Js'],
    } 

    const updateCourse = await service.update(id,updateCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(updateCourse)
  });

  it(' should remove one course', async() => {

    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.remove(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course)
  });

});

