import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Episode } from '@prisma/client';

export class GetCharacterListDto {
  @ApiProperty({ description: 'Character ID' })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Leia Organa',
    description: 'Character name',
  })
  name: string;

  @ApiProperty({
    isArray: true,
    enum: Episode,
    example: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
    description: 'Episodes in which the character appears',
  })
  episodes: Episode[];

  @ApiPropertyOptional({
    type: 'string',
    example: 'Alderaan',
    description: "Character's home planet",
  })
  planet?: string;
}
