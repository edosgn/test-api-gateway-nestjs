import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ingredient: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantitySold: number;
}
