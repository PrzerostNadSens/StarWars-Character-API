import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from '../characters/characters.service';
import { CharactersDao } from '../characters/characters.dao';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import {
  mockCharacters,
  generateFakeCreateCharacterDto,
  generateFakeCharacter,
} from './mocks';

describe('CharactersService', () => {
  let service: CharactersService;
  let dao: CharactersDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: CharactersDao,
          useValue: {
            create: jest.fn().mockResolvedValue(generateFakeCharacter()),
            findAll: jest.fn().mockResolvedValue(mockCharacters),
            findOne: jest.fn().mockResolvedValue(generateFakeCharacter()),
            findOneByName: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(generateFakeCharacter()),
            softDelete: jest.fn().mockResolvedValue(undefined),
            count: jest.fn().mockResolvedValue(mockCharacters.length),
          },
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    dao = module.get<CharactersDao>(CharactersDao);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a character', async () => {
      const result = await service.create(generateFakeCreateCharacterDto());
      expect(result).toHaveProperty('id');
      expect(result.name).toBeTruthy();
    });

    it('should throw BadRequestException if name is not unique', async () => {
      jest
        .spyOn(dao, 'findOneByName')
        .mockResolvedValueOnce(generateFakeCharacter());
      await expect(
        service.create(generateFakeCreateCharacterDto()),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of characters', async () => {
      const result = await service.findAll({ page: 0, limit: 20 });
      expect(result.items).toHaveLength(mockCharacters.length);
    });
  });

  describe('findOne', () => {
    it('should return a character', async () => {
      const result = await service.findOne('1');
      expect(result).toHaveProperty('id');
    });

    it('should throw NotFoundException if character not found', async () => {
      jest.spyOn(dao, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a character', async () => {
      const result = await service.update(
        '1',
        generateFakeCreateCharacterDto(),
      );
      expect(result).toHaveProperty('id');
    });

    it('should throw NotFoundException if character not found', async () => {
      jest.spyOn(dao, 'findOne').mockResolvedValueOnce(null);
      await expect(
        service.update('999', generateFakeCreateCharacterDto()),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a character', async () => {
      await service.softDelete('1');
      expect(dao.softDelete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if character not found', async () => {
      jest.spyOn(dao, 'findOne').mockResolvedValueOnce(null);
      await expect(service.softDelete('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
