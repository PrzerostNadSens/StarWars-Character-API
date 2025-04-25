import { CharacterDto, CreateCharacterDto, UpdateCharacterDto } from './dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CharactersDao } from './characters.dao';
import { paginate } from '@helpers/pagination/paginate';
import { PaginatedResponse, PaginateQueryDto } from '@helpers/pagination/dto';

@Injectable()
export class CharactersService {
  constructor(private dao: CharactersDao) {}

  async create(data: CreateCharacterDto): Promise<CharacterDto> {
    await this.ensureNameIsUnique(data.name);

    return this.dao.create(data);
  }

  async findAll(
    paginateQuery?: Partial<PaginateQueryDto>,
  ): Promise<PaginatedResponse<CharacterDto>> {
    const { page, limit } = paginateQuery;
    const skip = page * limit;
    const charactersQuery = this.dao.findAll(skip, limit);
    const countQuery = this.dao.count();

    const [characters, count] = await Promise.all([
      charactersQuery,
      countQuery,
    ]);
    return paginate(page, limit, count, characters);
  }

  async findOne(id: string): Promise<CharacterDto> {
    const character = await this.dao.findOne(id);

    if (!character) {
      throw new NotFoundException('Character with this id does not exist');
    }
    return character;
  }

  async update(id: string, data: UpdateCharacterDto): Promise<CharacterDto> {
    const currentData = await this.findOne(id);

    if (currentData.name !== data.name) {
      await this.ensureNameIsUnique(data.name);
    }

    return this.dao.update(id, data);
  }

  async softDelete(id: string): Promise<void> {
    await this.findOne(id);

    await this.dao.softDelete(id);
  }

  private async ensureNameIsUnique(name: string): Promise<void> {
    const existing = await this.dao.findOneByName(name);

    if (existing) {
      throw new BadRequestException(`Character with this name already exists`);
    }
  }
}
