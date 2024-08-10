import { Injectable } from '@nestjs/common';

import {
  PayloadTokenEntity,
  TokenEntity,
} from '@auth/domain/entities/token.entity';

import { ITokenRepository } from '@auth/domain/repositories/token.repository';

@Injectable()
export class TokenRepositoryImpl implements ITokenRepository {
  validate(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        resolve(Boolean(token));
      } catch (error) {
        reject(error);
      }
    });
  }
  generate(payload: PayloadTokenEntity): Promise<TokenEntity> {
    return new Promise<TokenEntity>((resolve, reject) => {
      try {
        resolve({ token: JSON.stringify(payload) });
      } catch (error) {
        reject(error);
      }
    });
  }
}
