import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleRequestDto } from './dto/article-request.dto';
import { ArticleResponseDto } from './dto/article-responde.dto';
import { SuccessResponseDto } from './dto/success-response.dto';
import { Repository } from 'typeorm';

/**
 * Servicio responsable de gestionar los artículos.
 */
@Injectable()
export class ArticleService {

  /**
   * Construye el ArticleService.
   * 
   * @param articleRepository - El repositorio para gestionar entidades `Article`.
   */
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }

  /**
   * Agrega un nuevo artículo a la base de datos.
   * 
   * @param articleRequestDto - El objeto de transferencia de datos que contiene los detalles del artículo.
   * @returns Un objeto que contiene el código de estado, mensaje de éxito y marca de tiempo.
   */
  async addNewArticle(articleRequestDto: ArticleRequestDto) {
    const newArticle = this.articleRepository.create(articleRequestDto);
    await this.articleRepository.save(newArticle);

    return {
      statusCode: 201,
      message: 'Article created successfully',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Recupera todos los artículos que no están marcados como eliminados.
   * 
   * @returns Una promesa que resuelve a un arreglo de objetos `ArticleResponseDto`.
   */
  async getAllArticles(): Promise<ArticleResponseDto[]> {
    const articles = await this.articleRepository.find({
      where: { isDeleted: false },
      select: { id: true, name: true, description: true, price: true, stock: true, isActive: true, createdAt: true },
      order: { createdAt: 'DESC' },
    });
    return articles;
  }

  /**
   * Recupera un solo artículo por su ID.
   * 
   * @param id - El ID del artículo a recuperar.
   * @returns Una promesa que resuelve a un objeto `ArticleResponseDto`.
   * @throws NotFoundException - Si el artículo con el ID dado no se encuentra o está marcado como eliminado.
   */
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

  /**
   * Actualiza un artículo existente por su ID.
   * 
   * @param id - El ID del artículo a actualizar.
   * @param articleRequestDto - El objeto de transferencia de datos que contiene los detalles actualizados del artículo.
   * @returns Un objeto que contiene el código de estado, mensaje de éxito y marca de tiempo.
   * @throws NotFoundException - Si el artículo con el ID dado no se encuentra o está marcado como eliminado.
   */
  async updateArticle(id: number, articleRequestDto: ArticleRequestDto) {
    const article = await this.articleRepository.findOne({ where: { id, isDeleted: false } });
    if (!article) {
      throw new NotFoundException(`Artículo con id ${id} no encontrado`);
    }
    // await this.articleRepository.update(id, articleRequestDto);
    article.name = articleRequestDto.name;
    article.description = articleRequestDto.description;
    article.price = articleRequestDto.price;
    article.stock = articleRequestDto.stock;
    article.isActive = articleRequestDto.isActive;
    await this.articleRepository.save(article);
    // const updatedArticle = await this.articleRepository.findOne({ where: { id, isDeleted: false } });
    return {
      statusCode: 200,
      message: 'Article updated successfully',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Marca un artículo como eliminado por su ID.
   * 
   * @param id - El ID del artículo a eliminar.
   * @returns Una promesa que resuelve a un objeto de respuesta de éxito que contiene el código de estado, mensaje de éxito y marca de tiempo.
   * @throws NotFoundException - Si el artículo con el ID dado no se encuentra o ya está marcado como eliminado.
   */
  async deleteArticle(id: number): Promise<SuccessResponseDto> {
    const article = await this.articleRepository.findOne({ where: { id, isDeleted: false } });
    if (!article) {
      throw new NotFoundException(`Artículo con id ${id} no encontrado`);
    }
    article.isDeleted = true;
    await this.articleRepository.save(article);
    return {
      statusCode: 200,
      message: 'Article deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }

}
