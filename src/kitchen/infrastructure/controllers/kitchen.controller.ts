import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyAlegra } from '../rabbitmq/client-proxy';

import { ORDER_MSG } from '@core/domain/enums/order-queue.enum';

import { CreateOrderDto } from '@kitchen/domain/dtos/create-order.dto';

@ApiTags('kitchen')
@Controller('kitchen/order')
export class KitchenController {
  constructor(private readonly clientProxyAlegra: ClientProxyAlegra) {}

  private clientProxy = this.clientProxyAlegra.clientProxyOrders();

  @Post('create')
  async create(@Body() payload: CreateOrderDto) {
    console.log('file: kitchen.controller.ts:21 ~ payload:', payload);
    return this.clientProxy.send(ORDER_MSG.CREATE_ORDER, payload);
  }
}
