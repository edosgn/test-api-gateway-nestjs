import { LoginServiceImpl } from '@auth/infrastructure/services/login.service.impl';
import { Module } from '@nestjs/common';

@Module({
  exports: [LoginServiceImpl],
})
export class DomainModule {}
