import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { UserRoles } from './enums';
import { ICreateTeacherRequest } from './interfaces/create-teacher.interface';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@ApiTags('User')
@ApiBearerAuth('auth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return await this.userService.create(createUserDto);
  }


  @Protected(true)
  @Roles([UserRoles.ADMIN]) 
  @Post("/teacher")
  async createTeacher(@Body() createUserDto: CreateTeacherDto) {
    return await this.userService.createTecher(createUserDto);
  }

  @Protected(true)  
  @Roles([UserRoles.ADMIN])
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Protected(true)  
  @Roles([UserRoles.ADMIN])
  @Get("/allTechers")
  async findAllTeacher() {
    return await this.userService.findAllTeacher();
  }


  @Protected(true)  
  @Roles([UserRoles.ADMIN])
  @Get("/allStudents")
  async findAllStudents() {
    return await this.userService.findAllStudents();
  }


  @Protected(true)
  @Roles([UserRoles.ADMIN,UserRoles.STUDENT])  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN,UserRoles.STUDENT])
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({
      ...updateUserDto,
      id
    });
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN,UserRoles.STUDENT])
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
