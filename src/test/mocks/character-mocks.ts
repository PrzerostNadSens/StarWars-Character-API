import { faker } from '@faker-js/faker';
import { Episode } from '@prisma/client';
import {
  CreateCharacterDto,
  UpdateCharacterDto,
  CharacterDto,
} from '@characters/dto';
import { v4 } from 'uuid';

export const generateFakeCharacter = (): CharacterDto => ({
  id: v4(),
  name: faker.person.firstName() + ' ' + faker.person.lastName(),
  episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
  planet: faker.helpers.arrayElement([null, 'Alderaan', 'Tatooine', 'Naboo']),
});

export const generateFakeCreateCharacterDto = (): CreateCharacterDto => ({
  name: faker.person.firstName() + ' ' + faker.person.lastName(),
  episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
  planet: faker.helpers.arrayElement([null, 'Alderaan', 'Tatooine', 'Naboo']),
});

export const generateFakeUpdateCharacterDto = (): UpdateCharacterDto => ({
  name: faker.person.firstName() + ' ' + faker.person.lastName(),
  episodes: [Episode.NEWHOPE, Episode.EMPIRE],
  planet: faker.helpers.arrayElement([null, 'Alderaan', 'Tatooine', 'Naboo']),
});

export const mockCharacters = [
  {
    name: 'Luke Skywalker',
    episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
  },
  {
    name: 'Darth Vader',
    episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
  },
  {
    name: 'Han Solo',
    episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
  },
  {
    name: 'Leia Organa',
    episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI],
    planet: 'Alderaan',
  },
  { name: 'Wilhuff Tarkin', episodes: [Episode.NEWHOPE] },
  { name: 'C-3PO', episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI] },
  { name: 'R2-D2', episodes: [Episode.NEWHOPE, Episode.EMPIRE, Episode.JEDI] },
];
