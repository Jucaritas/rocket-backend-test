import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleRequestDto } from './dto/article-request.dto';
import { ArticleResponseDto } from './dto/article-responde.dto';
import { SuccessResponseDto } from './dto/success-response.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Articles')
@Controller('article')
@ApiBearerAuth()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Crear un nuevo artículo' })
  @ApiResponse({ status: 201, description: 'Artículo creado correctamente' })
  @ApiBody({ type: ArticleRequestDto })
  addArticle(@Body() articleRequestDto: ArticleRequestDto): Promise<SuccessResponseDto> {
    return this.articleService.addNewArticle(articleRequestDto);
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Obtener todos los artículos' })
  @ApiResponse({ status: 200, description: 'Lista de artículos obtenida exitosamente' })
  getAllStock(): Promise<ArticleResponseDto[]> {
    return this.articleService.getAllArticles();
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Obtener un artículo por ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1, description: 'ID del artículo' })
  @ApiResponse({ status: 200, description: 'Artículo encontrado' })
  @ApiResponse({ status: 404, description: 'Artículo no encontrado' })
  getArticleById(@Param('id') id: string): Promise<ArticleResponseDto> {
    return this.articleService.getArticleById(+id);
  }

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

