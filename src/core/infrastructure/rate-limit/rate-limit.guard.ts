import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly throttler: ThrottlerGuard) {}

  canActivate(context: ExecutionContext) {
    return this.throttler.canActivate(context);
  }
}
