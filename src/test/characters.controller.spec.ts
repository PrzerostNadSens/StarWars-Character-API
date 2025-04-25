import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import {
  mockCharacters,
  generateFakeCreateCharacterDto,
  generateFakeCharacter,
} from './mocks';
import { CharactersController } from '../characters/characters.controller';
import { CharactersService } from '../characters/characters.service';

describe('CharactersController', () => {
  let controller: CharactersController;
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: CharactersService,
          useValue: {
            create: jest.fn().mockResolvedValue(generateFakeCharacter()),
            findAll: jest.fn().mockResolvedValue({
              items: mockCharacters,
              totalCount: mockCharacters.length,
            }),
            findOne: jest.fn().mockResolvedValue(generateFakeCharacter()),
            update: jest.fn().mockResolvedValue(generateFakeCharacter()),
            softDelete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a character', async () => {
      const result = await controller.create(generateFakeCreateCharacterDto());
      expect(result).toHaveProperty('id');
      expect(result.name).toBeTruthy();
    });

    it('should throw BadRequestException if name is not unique', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(
          new BadRequestException('Character name already exists'),
        );
      await expect(
        controller.create(generateFakeCreateCharacterDto()),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of characters', async () => {
      const result = await controller.findAll();
      expect(result.items).toHaveLength(mockCharacters.length);
    });
  });

  describe('findOne', () => {
    it('should return a character by id', async () => {
      const result = await controller.findOne('1');
      expect(result).toHaveProperty('id');
    });

    it('should throw NotFoundException if character is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a character', async () => {
      const result = await controller.update(
        '1',
        generateFakeCreateCharacterDto(),
      );
      expect(result).toHaveProperty('id');
    });

    it('should throw NotFoundException if character is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(
        controller.update('999', generateFakeCreateCharacterDto()),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a character', async () => {
      await controller.remove('1');
      expect(service.softDelete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if character is not found', async () => {
      jest
        .spyOn(service, 'softDelete')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
