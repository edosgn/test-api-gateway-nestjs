import { TokenEntity } from '@auth/domain/entities/token.entity';
import { PayloadTokenEntity } from '@auth/domain/entities/token.entity';

export abstract class ITokenRepository {
  abstract validate(token: string): Promise<boolean>;
  abstract generate(payload: PayloadTokenEntity): Promise<TokenEntity>;
}
