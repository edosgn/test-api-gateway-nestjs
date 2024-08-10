import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyAlegra } from '../rabbitmq/client-proxy';

import { MARKETPLACE_MSG } from '@core/domain/enums/marketplace-queue.enum';

import { CreatePurchaseDto } from 'src/marketplace/domain/dtos/create-purchase.dto';
import { GetPurchaseExternalDto } from 'src/marketplace/domain/dtos/get-purchase-external.dto';

@ApiTags('marketplace')
@Controller('marketplace')
export class PurchaseController {
  constructor(private readonly clientProxyAlegra: ClientProxyAlegra) {}

  private clientProxy = this.clientProxyAlegra.clientProxyMarketplace();

  @Post('purchase/create')
  async createPurchase(@Body() payload: CreatePurchaseDto) {
    return this.clientProxy.send(MARKETPLACE_MSG.CREATE_PURCHASE, payload);
  }

  @Get('purchase/findAll')
  async findAllPurchase() {
    return this.clientProxy.send(MARKETPLACE_MSG.FIND_ALL_PURCHASE, {});
  }

  @Post('purchase/external')
  async getPurchaseExternal(@Body() payload: GetPurchaseExternalDto) {
    return this.clientProxy.send(
      MARKETPLACE_MSG.GET_PURCHASE_EXTERNAL,
      payload,
    );
  }
}
