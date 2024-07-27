/* eslint-disable prettier/prettier */
import { IsString } from "class-validator"


export class CreateCourseDTO{
   @IsString()
   readonly name: string

   @IsString()
   readonly  descrition: string

   @IsString({each:true})
   readonly   tagas: string[]
}