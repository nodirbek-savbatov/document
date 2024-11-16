import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ICreateTeacherRequest } from "../interfaces/create-teacher.interface";
import { UserRoles } from "../enums";

export class CreateTeacherDto implements ICreateTeacherRequest {
    @ApiProperty({
        description: 'User full-name : ',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty({
        description: 'User email : ',
        example: 'timurbek@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password : ',
        example: '123456'
    })
    @IsNotEmpty()
    @IsString()
    password: string;


    @ApiProperty({
        description: 'User role',
        example: 'teacher'
    })

    @IsNotEmpty()
    @IsString()
   role: UserRoles;
}