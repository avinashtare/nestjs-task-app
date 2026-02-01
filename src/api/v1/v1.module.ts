import { AuthModule } from '@/modules/auth/auth.module';
import { NoteModule } from '@/modules/note/note.module';
import { Module } from '@nestjs/common';

@Module({ imports: [AuthModule, NoteModule] })
export class V1Module {}
