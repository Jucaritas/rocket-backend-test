import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleRequestDto } from './dto/article-request.dto';
import { ArticleResponseDto } from './dto/article-responde.dto';
import { SuccessResponseDto } from './dto/success-response.dto';
import { Auth } from '../auth/decorators/auth.decorator';

/**
 * Controlador para gestionar las operaciones relacionadas con los artículos.
 */
@ApiTags('Articles')
@Controller('article')
@ApiBearerAuth()
export class ArticleController {
  /**
   * Constructor del controlador de artículos.
   * @param articleService Servicio para manejar la lógica de negocio de los artículos.
   */
  constructor(private readonly articleService: ArticleService) { }

  /**
   * Endpoint para crear un nuevo artículo.
   * @param articleRequestDto Datos del artículo a crear.
   * @returns Una promesa que resuelve con una respuesta de éxito.
   */
  @Post()
  @Auth()
  @ApiOperation({ summary: 'Crear un nuevo artículo' })
  @ApiResponse({ status: 201, description: 'Artículo creado correctamente' })
  @ApiBody({ type: ArticleRequestDto })
  addArticle(@Body() articleRequestDto: ArticleRequestDto): Promise<SuccessResponseDto> {
    return this.articleService.addNewArticle(articleRequestDto);
  }

  /**
   * Endpoint para obtener todos los artículos.
   * @returns Una promesa que resuelve con una lista de artículos.
   */
  @Get()
  @Auth()
  @ApiOperation({ summary: 'Obtener todos los artículos' })
  @ApiResponse({ status: 200, description: 'Lista de artículos obtenida exitosamente' })
  getAllStock(): Promise<ArticleResponseDto[]> {
    return this.articleService.getAllArticles();
  }

  /**
   * Endpoint para obtener un artículo por su ID.
   * @param id ID del artículo a buscar.
   * @returns Una promesa que resuelve con los datos del artículo encontrado.
   */
  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Obtener un artículo por ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'ID del artículo' })
  @ApiResponse({ status: 200, description: 'Artículo encontrado' })
  @ApiResponse({ status: 404, description: 'Artículo no encontrado' })
  getArticleById(@Param('id') id: string): Promise<ArticleResponseDto> {
    return this.articleService.getArticleById(+id);
  }

  /**
   * Endpoint para actualizar un artículo.
   * @param id ID del artículo a actualizar.
   * @param articleRequestDto Datos actualizados del artículo.
   * @returns Una promesa que resuelve con una respuesta de éxito.
   */
  @Put(':id')
  @Auth()
  @ApiOperation({ summary: 'Actualizar un artículo' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'ID del artículo' })
  @ApiResponse({ status: 200, description: 'Artículo actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Artículo no encontrado' })
  @ApiBody({ type: ArticleRequestDto })
  updateArticle(@Param('id') id: string, @Body() articleRequestDto: ArticleRequestDto): Promise<SuccessResponseDto> {
    return this.articleService.updateArticle(+id, articleRequestDto);
  }

  /**
   * Endpoint para eliminar un artículo.
   * @param id ID del artículo a eliminar.
   * @returns Una promesa que resuelve con una respuesta de éxito.
   */
  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Eliminar un artículo' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'ID del artículo' })
  @ApiResponse({ status: 200, description: 'Artículo eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Artículo no encontrado' })
  deleteArticle(@Param('id') id: string): Promise<SuccessResponseDto> {
    return this.articleService.deleteArticle(+id);
  }
}

