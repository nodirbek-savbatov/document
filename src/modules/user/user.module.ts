import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports : [SequelizeModule.forFeature([User])],
  exports : [UserService]
})
export class UserModule {}
