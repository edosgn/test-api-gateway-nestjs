import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ThrottlerModule, ThrottlerOptions, ThrottlerModuleOptions } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RateLimitOptions } from './interfaces/rate-limit-options.interface';
import { CustomRateLimitGuard } from './custom-rate-limit.guard';

@Module({})
export class RateLimitModule {
  static forRoot(options: RateLimitOptions): DynamicModule {
    const throttlerOpts: ThrottlerOptions = {
      ttl: options.ttl,
      limit: options.limit,
    };

    const throttlerModule: ThrottlerModuleOptions = {
      throttlers: [throttlerOpts],
    };

    const guardProvider: Provider = {
      provide: APP_GUARD,
      useClass: CustomRateLimitGuard, // <-- aquí el cambio
    };

    return {
      module: RateLimitModule,
      imports: [ThrottlerModule.forRoot(throttlerModule)],
      providers: [guardProvider],
    };
  }
}
