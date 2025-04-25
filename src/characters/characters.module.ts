import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersDao } from './characters.dao';
import { CharactersService } from './characters.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CharactersController],
  providers: [CharactersService, CharactersDao],
})
export class CharactersModule {}
