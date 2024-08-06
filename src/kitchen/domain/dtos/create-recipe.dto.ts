import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  ingredients: object;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  created_at: Date;
}
