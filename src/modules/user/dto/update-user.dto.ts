import { ApiProperty } from '@nestjs/swagger';
import { IUpdateUserRequest } from '../interfaces/update-user.interface';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../enums';

export class UpdateUserDto implements IUpdateUserRequest {
    @ApiProperty({
        description: 'User full-name : ',
        example: 'John Doe',
    })
    @IsOptional()
    @IsString()
    full_name?: string;

    @ApiProperty({
        description: 'User status : ',
        example: UserRoles.STUDENT
    })
    @IsOptional()
    @IsEnum(UserRoles)
    role?: UserRoles;

    @ApiProperty({
        description: 'User password : ',
        example: '123456'
    })
    @IsOptional()
    @IsString()
    password?: string;
}
