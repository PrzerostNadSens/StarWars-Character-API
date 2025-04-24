import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Episode } from '@prisma/client';

export class CreateCharacterDto {
  @ApiProperty({
    type: 'string',
    example: 'Leia Organa',
    description: 'Character name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    isArray: true,
    enum: Episode,
    example: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
    description: 'Episodes in which the character appears',
  })
  @IsArray()
  @IsEnum(Episode, { each: true })
  episodes: Episode[];

  @ApiPropertyOptional({
    type: 'string',
    example: 'Alderaan',
    description: "Character's home planet",
  })
  @IsOptional()
  @IsString()
  planet?: string;
}
