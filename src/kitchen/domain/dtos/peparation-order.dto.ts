import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PreparationOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  recipe_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stock: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
}
