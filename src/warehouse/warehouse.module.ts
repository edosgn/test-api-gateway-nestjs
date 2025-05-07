import { Module } from '@nestjs/common';

import { WarehouseController } from './infrastructure/controllers/warehouse.controller';

import { ClientProxyMyAPI } from './infrastructure/rabbitmq/client-proxy';

@Module({
  controllers: [WarehouseController],
  providers: [ClientProxyMyAPI],
  exports: [ClientProxyMyAPI],
})
export class WarehouseModule {}
