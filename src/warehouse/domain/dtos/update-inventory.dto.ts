import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ingredient_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
