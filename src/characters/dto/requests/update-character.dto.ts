import { CreateCharacterDto } from './create-character.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
