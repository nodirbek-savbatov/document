import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config';
import { Document } from './entities';
import { IDeleteFileResponse, IUpdateFileResponse } from './interfaces';

@ApiTags('Document')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Post()
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file)
    if (!file) throw new BadRequestException('File is required');
    return await this.documentsService.create({
      ...createDocumentDto,
      file: file.filename,
    });
  }

  @Get()
  async findAll(): Promise<Document[]> {
    return await this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return await this.documentsService.findOne(id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IUpdateFileResponse> {
    return await this.documentsService.update({
      ...updateDocumentDto,
      file: file.filename,
      id: id,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IDeleteFileResponse> {
    return await this.documentsService.remove(id);
  }
}