import { Module } from '@nestjs/common';

import { PurchaseController } from './infrastructure/controllers/purchase.controller';

import { ClientProxyMyAPI } from './infrastructure/rabbitmq/client-proxy';

@Module({
  controllers: [PurchaseController],
  providers: [ClientProxyMyAPI],
  exports: [ClientProxyMyAPI],
})
export class MarketplaceModule {}
