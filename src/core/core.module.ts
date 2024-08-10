import { Module } from '@nestjs/common';

import { ResponseEntity } from '@core/domain/entities/response.entity';

@Module({
  providers: [ResponseEntity],
  exports: [ResponseEntity],
})
export class CoreModule {}
