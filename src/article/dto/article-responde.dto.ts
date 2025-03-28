import { ApiProperty } from '@nestjs/swagger';

export class ArticleResponseDto {
  @ApiProperty({ example: 1, description: 'Identificador único del artículo' })
  id: number;

  @ApiProperty({ example: 'Laptop Gamer', description: 'Nombre del artículo' })
  name: string;

  @ApiProperty({ example: 'Laptop con procesador i7 y 16GB RAM', description: 'Descripción del artículo' })
  description: string;

  @ApiProperty({ example: 1500.99, description: 'Precio del artículo', type: Number })
  price: number;

  @ApiProperty({ example: 10, description: 'Cantidad de artículos en stock', type: Number })
  stock: number;

  @ApiProperty({ example: true, description: 'Indica si el artículo está activo' })
  isActive: boolean;

  @ApiProperty({ example: '2024-03-27T12:00:00Z', description: 'Fecha de creación del artículo' })
  createdAt: Date;
}
