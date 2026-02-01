import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ValidationPipe } from '@/common/pipe/validation.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { type Request } from 'express';
import { MongoIdPipe } from '@/common/pipe/mongoID.pipe';

@Controller('/api/v1/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
    @Req() req: Request,
  ) {
    return this.noteService.create(createNoteDto, String(req.user?.id));
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Query('take', new ParseIntPipe({ optional: true })) take: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number,
    @Req() req: Request,
  ) {
    return this.noteService.findAll({ take, skip }, String(req.user?.id));
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', MongoIdPipe) id: string, @Req() req: Request) {
    return this.noteService.findOne(id, String(req.user?.id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body(new ValidationPipe()) updateNoteDto: UpdateNoteDto,
    @Req() req: Request,
  ) {
    return this.noteService.update(id, updateNoteDto, String(req.user?.id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', MongoIdPipe) id: string, @Req() req: Request) {
    return this.noteService.remove(id, String(req.user?.id));
  }
}
