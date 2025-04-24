import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CharacterDto, CreateCharacterDto, UpdateCharacterDto } from './dto';

@Injectable()
export class CharactersDao {
  private readonly repository: Prisma.CharacterDelegate;

  constructor(prismaService: PrismaService) {
    this.repository = prismaService.character;
  }

  async create(data: CreateCharacterDto): Promise<CharacterDto> {
    return this.repository.create({
      data,
      select: {
        id: true,
        name: true,
        episodes: true,
        planet: true,
      },
    });
  }

  async findAll(skip: number, take: number): Promise<CharacterDto[]> {
    return this.repository.findMany({
      where: { deletedAt: null },
      skip,
      take,
      select: {
        id: true,
        name: true,
        episodes: true,
        planet: true,
      },
    });
  }

  async count(): Promise<number> {
    return this.repository.count({ where: { deletedAt: null } });
  }

  async findOne(id: string): Promise<CharacterDto> {
    return this.repository.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        episodes: true,
        planet: true,
      },
    });
  }

  async findOneByName(name: string): Promise<CharacterDto> {
    return this.repository.findUnique({
      where: { name, deletedAt: null },
    });
  }

  async update(id: string, data: UpdateCharacterDto): Promise<CharacterDto> {
    return this.repository.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        episodes: true,
        planet: true,
      },
    });
  }

  async softDelete(id: string): Promise<CharacterDto> {
    return this.repository.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
