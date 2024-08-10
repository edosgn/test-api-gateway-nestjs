import { Module } from '@nestjs/common';

import { PurchaseController } from './infrastructure/controllers/purchase.controller';

import { ClientProxyAlegra } from './infrastructure/rabbitmq/client-proxy';

@Module({
  controllers: [PurchaseController],
  providers: [ClientProxyAlegra],
  exports: [ClientProxyAlegra],
})
export class MarketplaceModule {}
