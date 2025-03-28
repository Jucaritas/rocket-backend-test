import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { ArticleRequestDto } from './dto/article-request.dto';
import { NotFoundException } from '@nestjs/common';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: Repository<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    repository = module.get<Repository<Article>>(getRepositoryToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addNewArticle', () => {
    it('should create a new article', async () => {
      const articleDto: ArticleRequestDto = {
        name: 'Test Article',
        description: 'Test Description',
        price: 100,
        stock: 10,
        isActive: true,
      };

      const mockArticle = {
        ...articleDto,
        id: 1,
        createdAt: new Date(),
        isDeleted: false,
      };

      jest.spyOn(repository, 'create').mockReturnValue(mockArticle);
      jest.spyOn(repository, 'save').mockResolvedValue(mockArticle);

      const result = await service.addNewArticle(articleDto);

      expect(repository.create).toHaveBeenCalledWith(articleDto);
      
      expect(repository.save).toHaveBeenCalledWith(mockArticle);
      
      expect(result.statusCode).toBe(201);
      expect(result.message).toBe('Article created successfully');
    });

  });

  describe('deleteArticle', () => {
    it('should mark article as deleted and return success response', async () => {
      const mockArticle = {
        id: 1,
        isDeleted: false,
      } as Article;

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockArticle);
      jest.spyOn(repository, 'save').mockResolvedValue(mockArticle);

      const result = await service.deleteArticle(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1, isDeleted: false }
      });
      
      expect(mockArticle.isDeleted).toBe(true);
      
      expect(repository.save).toHaveBeenCalledWith(mockArticle);

      expect(result).toEqual({
        statusCode: 200,
        message: 'Article deleted successfully',
        timestamp: expect.any(String),
      });
    });

    it('should throw NotFoundException when article does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteArticle(999)).rejects.toThrow(NotFoundException);
      await expect(service.deleteArticle(999)).rejects.toThrow(
        'Artículo con id 999 no encontrado',
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 999, isDeleted: false },
      });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
