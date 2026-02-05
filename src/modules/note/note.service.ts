import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '@/database/prisma.service';
import { INote } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<INote> {
    const newNote = await this.prisma.note.create({
      data: {
        title: createNoteDto.content,
        content: createNoteDto.title,
        userId,
      },
    });

    return newNote;
  }

  async findAll(
    { skip, take }: { skip: number; take: number },
    userId: string,
  ): Promise<INote[]> {
    const allNote = await this.prisma.note.findMany({
      where: { userId },
      take: take || 10,
      skip: skip || 0,
    });
    return allNote;
  }

  async findOne(id: string, userId: string): Promise<INote> {
    const note = await this.prisma.note.findFirst({
      where: { id, userId },
    });

    if (!note) throw new NotFoundException('Note not found');

    return note;
  }

  async update(id: string, dto: UpdateNoteDto, userId: string): Promise<INote> {
    try {
      const note = await this.prisma.note.update({
        where: { id, userId },
        data: dto,
      });
      return note;
    } catch {
      throw new ForbiddenException('unable to update');
    }
  }

  async remove(id: string, userId: string): Promise<INote | null> {
    try {
      const note = await this.prisma.note.delete({
        where: { id, userId },
      });
      return note;
    } catch {
      throw new ForbiddenException('unable to remove');
    }
  }
}
