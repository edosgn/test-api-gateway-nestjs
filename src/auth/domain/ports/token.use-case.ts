import { TokenEntity } from '@auth/domain/entities/token.entity';

export abstract class ITokenUseCase {
  abstract execute(data: TokenEntity): Promise<void>;
}
