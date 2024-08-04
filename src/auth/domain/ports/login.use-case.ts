import { LoginEntity } from '@auth/domain/entities/login.entity';
import { ResponseEntity } from '@core/domain/entities/response.entity';

export abstract class ILoginUseCase {
  abstract execute(data: LoginEntity): Promise<ResponseEntity | void>;
}
