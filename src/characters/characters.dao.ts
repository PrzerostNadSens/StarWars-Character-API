import { Prisma, Character } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CharactersDao {
  private readonly repository: Prisma.CharacterDelegate;

  constructor(prismaService: PrismaService) {
    this.repository = prismaService.character;
  }

  async create(data: Prisma.CharacterCreateInput): Promise<Character> {
    return this.repository.create({
      data,
    });
  }

  async findAll(): Promise<Character[]> {
    return this.repository.findMany({});
  }

  async findOne(id: string): Promise<Character> {
    return this.repository.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.CharacterUpdateInput,
  ): Promise<Character> {
    return this.repository.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Character> {
    return this.repository.delete({
      where: { id },
    });
  }
}
