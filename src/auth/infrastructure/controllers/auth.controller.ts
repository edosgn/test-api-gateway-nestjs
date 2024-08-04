import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { LoginDto } from '@auth/domain/dtos/login.dto';

import { ILoginUseCase } from '@auth/domain/ports/login.use-case';

@ApiTags('posts')
@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: ILoginUseCase) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.loginUseCase.execute(data);
  }
}
