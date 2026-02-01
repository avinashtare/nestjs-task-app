import { IUser } from '@/modules/user/entities/user.entity';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user as IUser;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    return user as IUser;
  }

  async createUser(
    user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'>,
  ): Promise<IUser> {
    const newUser = await this.prisma.user.create({ data: user });
    return newUser as IUser;
  }
}
