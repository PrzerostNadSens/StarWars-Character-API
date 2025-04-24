import { GetCharacterListDto, CharacterDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { CharactersDao } from './characters.dao';

@Injectable()
export class CharactersService {
  constructor(private dao: CharactersDao) {}

  async create(data: Prisma.CharacterCreateInput): Promise<CharacterDto> {
    return this.dao.create(data);
  }

  async findAll(): Promise<GetCharacterListDto[]> {
    return this.dao.findAll();
  }

  async findOne(id: string): Promise<CharacterDto> {
    const character = await this.dao.findOne(id);

    if (!character) {
      throw new NotFoundException('Character with this id does not exist');
    }
    return character;
  }

  async update(
    id: string,
    data: Prisma.CharacterUpdateInput,
  ): Promise<CharacterDto> {
    await this.findOne(id);

    return this.dao.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.dao.remove(id);
  }
}
