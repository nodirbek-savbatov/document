import { ApiProperty } from "@nestjs/swagger";
import { ICreateUserRequest } from "../interfaces";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto implements ICreateUserRequest {
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
}