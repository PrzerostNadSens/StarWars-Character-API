import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto, CharacterDto, UpdateCharacterDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { PaginateQueryDto, PaginatedResponse } from '@helpers/pagination/dto';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiOperation({ summary: 'The character has been created' })
  @ApiCreatedResponse({ type: CharacterDto })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
  ): Promise<CharacterDto> {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of characters' })
  @ApiOkResponse({ type: PaginatedResponse<CharacterDto> })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async findAll(
    @Query() paginateQuery?: PaginateQueryDto,
  ): Promise<PaginatedResponse<CharacterDto>> {
    return this.charactersService.findAll(paginateQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get character details' })
  @ApiOkResponse({ type: CharacterDto })
  @ApiNotFoundResponse({ description: 'Character was not found in database' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async findOne(@Param('id') id: string): Promise<CharacterDto> {
    return this.charactersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a character' })
  @ApiOkResponse({ type: CharacterDto })
  @ApiNotFoundResponse({ description: 'Character was not found in database' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<CharacterDto> {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a character' })
  @ApiNoContentResponse({ description: 'Character was deleted' })
  @ApiNotFoundResponse({ description: 'Character was not found in database' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.charactersService.softDelete(id);
  }
}
