import { Module } from '@nestjs/common';

import { WarehouseController } from './infrastructure/controllers/warehouse.controller';

import { ClientProxyAlegra } from './infrastructure/rabbitmq/client-proxy';

@Module({
  controllers: [WarehouseController],
  providers: [ClientProxyAlegra],
  exports: [ClientProxyAlegra],
})
export class WarehouseModule {}
