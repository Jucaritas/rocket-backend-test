import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { ArticleRequestDto } from './dto/article-request.dto';

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
});