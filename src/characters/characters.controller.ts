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
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import {
  CreateCharacterDto,
  GetCharacterListDto,
  CharacterDto,
  UpdateCharacterDto,
} from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiOperation({ summary: 'The character has been created' })
  @ApiOkResponse({ type: CharacterDto })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
  ): Promise<CreateCharacterDto> {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of characters' })
  @ApiOkResponse({ type: GetCharacterListDto })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async findAll(): Promise<GetCharacterListDto[]> {
    return this.charactersService.findAll();
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
    await this.charactersService.remove(id);
  }
}
