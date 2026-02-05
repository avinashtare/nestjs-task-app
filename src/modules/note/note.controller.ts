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
  UseInterceptors,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ValidationPipe } from '@/common/pipe/validation.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { type Request } from 'express';
import { MongoIdPipe } from '@/common/pipe/mongoID.pipe';
import {
  ResponseSuccess,
  ResponseSuceessForamt,
} from '@/common/inspectors/ResponseSuceessForamt.inspector';
import { INote } from './entities/note.entity';

@Controller('/api/v1/note')
@UseInterceptors(ResponseSuceessForamt)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
    @Req() req: Request,
  ): Promise<ResponseSuccess<{ id: INote['id'] }>> {
    const newNote = await this.noteService.create(
      createNoteDto,
      String(req.user?.id),
    );

    return { message: 'note created', data: { id: newNote.id } };
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('take', new ParseIntPipe({ optional: true })) take: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number,
    @Req() req: Request,
  ): Promise<ResponseSuccess<INote[]>> {
    const allNotes = await this.noteService.findAll(
      { take, skip },
      String(req.user?.id),
    );
    return { message: 'all notes fetched', data: allNotes };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', MongoIdPipe) id: string,
    @Req() req: Request,
  ): Promise<ResponseSuccess<INote>> {
    const note = await this.noteService.findOne(id, String(req.user?.id));

    return { message: 'note fetched', data: note };
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body(new ValidationPipe()) updateNoteDto: UpdateNoteDto,
    @Req() req: Request,
  ): Promise<ResponseSuccess<INote>> {
    const updatedNote = await this.noteService.update(
      id,
      updateNoteDto,
      String(req.user?.id),
    );

    return { message: 'note updated', data: updatedNote };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id', MongoIdPipe) id: string,
    @Req() req: Request,
  ): Promise<ResponseSuccess<{ id: INote['id'] }>> {
    const deleteResult = await this.noteService.remove(
      id,
      String(req.user?.id),
    );

    const noteId =
      deleteResult && typeof deleteResult === 'object' ? deleteResult.id : id;

    return {
      message: 'note deleted',
      data: { id: noteId },
    };
  }
}
