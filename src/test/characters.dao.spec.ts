import { Test, TestingModule } from '@nestjs/testing';
import { CharactersDao } from '@characters/characters.dao';
import { PrismaService } from '@database/prisma.service';
import { generateFakeCharacter, mockCharacters } from './mocks';

describe('CharactersDao', () => {
  let dao: CharactersDao;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersDao, PrismaService],
    }).compile();

    dao = module.get<CharactersDao>(CharactersDao);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(dao).toBeDefined();
  });

  describe('create', () => {
    it('should create a character', async () => {
      jest
        .spyOn(prismaService.character, 'create')
        .mockResolvedValue(generateFakeCharacter() as any);
      const result = await dao.create(generateFakeCharacter());
      expect(result).toHaveProperty('id');
    });
  });

  describe('findAll', () => {
    it('should return all characters', async () => {
      jest
        .spyOn(prismaService.character, 'findMany')
        .mockResolvedValue(mockCharacters as any);
      const result = await dao.findAll(0, 20);
      expect(result).toHaveLength(mockCharacters.length);
    });
  });

  describe('findOne', () => {
    it('should return one character by id', async () => {
      jest
        .spyOn(prismaService.character, 'findUnique')
        .mockResolvedValue(generateFakeCharacter() as any);
      const result = await dao.findOne('1');
      expect(result).toHaveProperty('id');
    });

    it('should return null if character does not exist', async () => {
      jest
        .spyOn(prismaService.character, 'findUnique')
        .mockResolvedValueOnce(null);
      const result = await dao.findOne('999');
      expect(result).toBeNull();
    });
  });

  describe('softDelete', () => {
    it('should soft delete a character', async () => {
      jest
        .spyOn(prismaService.character, 'update')
        .mockResolvedValue(generateFakeCharacter() as any);
      const result = await dao.softDelete('1');
      expect(result).toHaveProperty('id');
    });
  });
});
