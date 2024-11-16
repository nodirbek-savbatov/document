import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Document])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
