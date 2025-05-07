import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from '@auth/auth.module';
import { CoreModule } from './core/core.module';
import { KitchenModule } from './kitchen/kitchen.module';

import { GlobalExceptionFilter } from '@core/infrastructure/filters/global-exception.filter';
import { WarehouseModule } from './warehouse/warehouse.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { RateLimitModule } from '@core/infrastructure/rate-limit/rate-limit.module';

@Module({
  imports: [
    RateLimitModule.forRoot({ ttl: 30, limit: 30 }),
    AuthModule,
    CoreModule,
    KitchenModule,
    WarehouseModule,
    MarketplaceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
