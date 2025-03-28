import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleRequestDto } from './dto/article-request.dto';
import { ArticleResponseDto } from './dto/article-responde.dto';
import { SuccessResponseDto } from './dto/success-response.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async addNewArticle(articleRequestDto: ArticleRequestDto) {
    const newArticle = this.articleRepository.create(articleRequestDto);
    await this.articleRepository.save(newArticle);

    return {
      statusCode: 201,
      message: 'Article created successfully',
      timestamp: new Date().toISOString(),
    };
  }

  async getAllArticles(): Promise<ArticleResponseDto[]> {
    const articles = await this.articleRepository.find({
      where: { isDeleted: false },
      select: { id: true, name: true, description: true, price: true, stock: true, isActive: true, createdAt: true },
      order: { createdAt: 'DESC' },
    });
    return articles;
  }

  async getArticleById(id: number): Promise<ArticleResponseDto> {
    const article = await this.articleRepository.findOne({ 
      where: { id, isDeleted: false },
      select: { id: true, name: true, description: true, price: true, stock: true, isActive: true, createdAt: true },
    });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  async updateArticle(id: number, articleRequestDto: ArticleRequestDto) {
    const article = await this.articleRepository.findOne({ where: { id, isDeleted: false } });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    await this.articleRepository.update(id, articleRequestDto);
    const updatedArticle = await this.articleRepository.findOne({ where: { id, isDeleted: false } });
    return {
      statusCode: 200,
      message: 'Article updated successfully',
      timestamp: new Date().toISOString(),
    };
  }

  async deleteArticle(id: number): Promise<SuccessResponseDto> {
    const article = await this.articleRepository.findOne({ where: { id, isDeleted: false } });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    await this.articleRepository.update(id, { isDeleted: true });
    await this.articleRepository.save(article);
    return {
      statusCode: 200,
      message: 'Article deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }

}
