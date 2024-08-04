import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { AuthModule } from '@auth/auth.module';
import { CoreModule } from './core/core.module';
import { KitchenModule } from './kitchen/kitchen.module';

import { GlobalExceptionFilter } from '@core/infrasctructure/filters/global-exception.filter';

@Module({
  imports: [AuthModule, CoreModule, KitchenModule],
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
