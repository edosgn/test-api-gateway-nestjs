import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class CustomRateLimitGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    context: ExecutionContext,
    limitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.connection?.remoteAddress || 'IP desconocida';

    const retryAfterSec = Math.ceil(
      (limitDetail?.ttl - (Date.now() - limitDetail.timeToBlockExpire)) / 1000,
    );

    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: `Demasiadas peticiones desde la IP ${ip}. Intenta de nuevo en ${retryAfterSec} segundos.`,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
