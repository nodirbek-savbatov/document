import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICreateUserRequest, ICreateUserResponse, IUser } from './interfaces';
import { IUpdateUserRequest } from './interfaces/update-user.interface';
import { User } from './models';
import { hash } from 'bcrypt';
import { HASH_SALT } from '@constants';
import { InjectModel } from '@nestjs/sequelize';
import { Document } from '../documents';
import { UserRoles } from './enums';
import { ICreateTeacherRequest } from './interfaces/create-teacher.interface';
import { where } from 'sequelize';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User
  ) { }

  async create(payload: ICreateUserRequest): Promise<ICreateUserResponse> {

    const existedUser = await this.findByEmail(payload.email)
    if (existedUser)
      throw new BadRequestException('Email already in use')

    payload.password = await hash(payload.password, HASH_SALT)
    const user = await this.userModel.create(payload)

    return {
      message: 'User created successfully',
      user: await this.findOne(user.id)
    };
  }


  async createTecher(payload: ICreateTeacherRequest): Promise<ICreateUserResponse> {

    const existedUser = await this.findByEmail(payload.email)
    if (existedUser)
      throw new BadRequestException('Email already in use')

    payload.password = await hash(payload.password, HASH_SALT)
    const user = await this.userModel.create({
      ...payload,
      role: UserRoles.TEACHER
    })

    return {
      message: 'User created successfully',
      user: await this.findOne(user.id)
    };
  }
  async findAll() {
    return await this.userModel.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: [{model: Document}]
    });
  }

  async findAllTeacher() {
    return await this.userModel.findAll({
      where: { role: UserRoles.TEACHER },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: [{ model: Document }]
    });
  }



  async findAllStudents() {
    return await this.userModel.findAll({
      where: { role: UserRoles.STUDENT },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: [{ model: Document }]
    });
  }
  

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: [{model: Document}]
    })
    if (!user)
      throw new NotFoundException('User not found')

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      where: {
        email
      }
    })
  }

  async update(payload: IUpdateUserRequest) {
    const user = await this.findOne(payload.id)
    await user.update({
      full_name: payload.full_name,
      role: payload.role,
      password: payload.password
    })


    return {
      message: 'User updated successfully',
      user: await this.findByEmail(user.email)
    };
  }

  async remove(id: number) {
    const user = this.findOne(id);
    (await user).destroy()

    return {
      message: 'User deleted successfully',
      user
    };
  }
}
