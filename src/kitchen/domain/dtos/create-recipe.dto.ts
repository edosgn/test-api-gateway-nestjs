import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  created_at: Date;
}
