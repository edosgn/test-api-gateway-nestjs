import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyAlegra } from '../rabbitmq/client-proxy';

import { MARKETPLACE_MSG } from '@core/domain/enums/marketplace-queue.enum';

import { CreatePurchaseDto } from 'src/marketplace/domain/dtos/create-purchase.dto';

@ApiTags('marketplace')
@Controller('marketplace')
export class PurchaseController {
  constructor(private readonly clientProxyAlegra: ClientProxyAlegra) {}

  private clientProxy = this.clientProxyAlegra.clientProxyMarketplace();

  @Post('purchase/create')
  async createPurchase(@Body() payload: CreatePurchaseDto) {
    return this.clientProxy.send(MARKETPLACE_MSG.CREATE_PURCHASE, payload);
  }
}
