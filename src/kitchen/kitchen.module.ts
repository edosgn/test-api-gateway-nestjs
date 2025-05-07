import { Module } from '@nestjs/common';

import { KitchenController } from './infrastructure/controllers/kitchen.controller';

import { ClientProxyMyAPI } from './infrastructure/rabbitmq/client-proxy';

@Module({
  controllers: [KitchenController],
  providers: [ClientProxyMyAPI],
  exports: [ClientProxyMyAPI],
})
export class KitchenModule {}
