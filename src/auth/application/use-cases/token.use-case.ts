import { TokenEntity } from '@auth/domain/entities/token.entity';

import { ITokenUseCase } from '@auth/domain/ports/token.use-case';

import { ITokenRepository } from '@auth/domain/repositories/token.repository';
export class TokenUseCase implements ITokenUseCase {
  constructor(private readonly repository: ITokenRepository) {}

  async execute(data: TokenEntity): Promise<void> {
    try {
      const isValid = await this.repository.validate(data.token);

      if (isValid) {
        // Token is valid, do something
        console.log('Token is valid');
      } else {
        // Token is invalid, do something else
        console.log('Token is invalid');
      }
    } catch (error) {
      // Handle any errors that occur during token validation
      console.error('Error validating token:', error);
    }
  }
}
