import { Module } from '@nestjs/common';

import { KitchenController } from './infrastructure/controllers/kitchen.controller';

import { ClientProxyAlegra } from './infrastructure/rabbitmq/client-proxy';

@Module({
  controllers: [KitchenController],
  providers: [ClientProxyAlegra],
  exports: [ClientProxyAlegra],
})
export class KitchenModule {}
