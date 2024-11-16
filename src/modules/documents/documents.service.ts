import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateFileRequest,
  IDeleteFileResponse,
  IUpdateFileRequest,
  IUpdateFileResponse,
} from './interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { Document } from './entities';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../user';

@Injectable()
export class DocumentsService {
  constructor(@InjectModel(Document) private documentModel: typeof Document) {}

  async create(payload: ICreateFileRequest): Promise<Document> {
    try {
      return await this.documentModel.create({
        name: payload.name,
        file: payload.file,
        userId: payload.userId,
      });
    } catch (error) {
      console.log(error)
      throw new BadRequestException(`Create document error ${error}`);
    }
  }

  async findAll(): Promise<Document[]> {
    try {
      return await this.documentModel.findAll({include: [{model: User}]});
    } catch (error) {
      throw new BadRequestException('Get document error');
    }
  }

  async findOne(id: number): Promise<Document> {
    const document = await this.documentModel.findOne({ where: { id } });
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async update(payload: IUpdateFileRequest): Promise<IUpdateFileResponse> {
    const document = await this.documentModel.findByPk(payload.id);
    if (!document) throw new NotFoundException('Document not found');

    if (payload.file && document.file) {
      fs.unlink(path.join(process.cwd(), 'uploads', document.file), err => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    await this.documentModel.update(
      {
        name: payload.name,
        file: payload.file,
      },
      { where: { id: payload.id } },
    );

    return { message: 'Updated successfully' };
  }

  async remove(id: number): Promise<IDeleteFileResponse> {
    const document = await this.documentModel.findByPk(id);
    if (!document) throw new NotFoundException('Document not found');

    fs.unlink(path.join(process.cwd(), 'uploads', document.file), err => {
      if (err) console.error('Error deleting file:', err);
    });

    await this.documentModel.destroy({ where: { id } });
    return { message: 'Removed successfully' };
  }
}