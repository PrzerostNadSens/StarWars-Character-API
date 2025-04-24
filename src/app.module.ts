import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [CharactersModule, DatabaseModule],
})
export class AppModule {}
