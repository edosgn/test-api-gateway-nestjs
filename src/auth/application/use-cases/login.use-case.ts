import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginEntity } from '@auth/domain/entities/login.entity';

import { ILoginUseCase } from '@auth/domain/ports/login.use-case';
import { ILoginService } from '@auth/domain/services/login.service';
import { ResponseEntity } from '@core/domain/entities/response.entity';
import { PayloadTokenEntity } from '@auth/domain/entities/token.entity';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly loginService: ILoginService,
    private readonly jwtService: JwtService,
  ) {}
  async execute(data: LoginEntity): Promise<ResponseEntity | void> {
    // Call the loginService to fetch the user by username
    const user = await this.loginService.findByUsername(data.username);

    // Check if the user exists and the password matches
    if (user && user.password === data.password) {
      const payload: PayloadTokenEntity = {
        name: user.name,
        role: user.role,
      };

      const token = this.jwtService.sign(payload, {
        secret: `${process.env.JWT_SECRET}`,
      });

      // Example: Generate a JWT token
      //const token = this.tokenRepository.generate(payload);

      // Example: Save the token in the user's session
      //await this.repository.saveToken(user.id, token);

      // Example: Return the token to the caller
      return {
        statusCode: HttpStatus.OK,
        status: 'success',
        message: 'Apigateway ok',
        data: {
          token,
        },
      };
    }
  }
}
