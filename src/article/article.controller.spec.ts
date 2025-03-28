import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRequestDto } from './dto/article-request.dto';
import { SuccessResponseDto } from './dto/success-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { MockAuthGuard } from '../auth/guard/mock-user-role.guard';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            addNewArticle: jest.fn(),
            getAllArticles: jest.fn(),
            getArticleById: jest.fn(),
            updateArticle: jest.fn(),
            deleteArticle: jest.fn(),
          },
        },
      ],
    })
    .overrideGuard(AuthGuard) // Sobrescribe el AuthGuard real
      .useClass(MockAuthGuard) // Usa nuestro mock
      .compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /article', () => {
    it('should create an article', async () => {
      const articleDto: ArticleRequestDto = {
        name: 'Test',
        description: 'Test',
        price: 100,
        stock: 10,
        isActive: true,
      };

      const result: SuccessResponseDto = {
        statusCode: 201,
        message: 'Article created successfully',
        timestamp: new Date().toISOString(),
      };

      jest.spyOn(service, 'addNewArticle').mockResolvedValue(result);

      expect(await controller.addArticle(articleDto)).toBe(result);
      expect(service.addNewArticle).toHaveBeenCalledWith(articleDto);
    });
  });

  describe('deleteArticle', () => {
    it('should delete an article and return success response', async () => {
      const expectedResponse: SuccessResponseDto = {
        statusCode: 200,
        message: 'Article deleted successfully',
        timestamp: new Date().toISOString(),
      };

      (service.deleteArticle as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await controller.deleteArticle('1');

      expect(service.deleteArticle).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate error when service throws an exception', async () => {      
      const errorResponse = new Error('Article not found');
      (service.deleteArticle as jest.Mock).mockRejectedValue(errorResponse);

      await expect(controller.deleteArticle('999')).rejects.toThrow('Article not found');
      
      expect(service.deleteArticle).toHaveBeenCalledWith(999);
    });
  });
});
