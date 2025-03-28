import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt, Min, IsBoolean } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ArticleRequestDto {
  
  @ApiProperty({ example: 'Laptop Gamer', description: 'Nombre del artículo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Laptop con procesador i7 y 16GB RAM', description: 'Descripción del artículo' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1500.99, description: 'Precio del artículo', type: Number })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 10, description: 'Cantidad de artículos en stock', type: Number })
  @IsNumber()
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: true, description: 'Indica si el artículo está activo' })
  @IsBoolean()
  isActive: boolean;
}
