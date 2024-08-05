import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyAlegra } from '../rabbitmq/client-proxy';

import { INGREDIENT_MSG } from '@core/domain/enums/order-queue.enum';

import { CreateIngredientDto } from '@warehouse/domain/dtos/create-ingredient.dto';

@ApiTags('warehouse')
@Controller('warehouse/order')
export class WarehouseController {
  constructor(private readonly clientProxyAlegra: ClientProxyAlegra) {}

  private clientProxy = this.clientProxyAlegra.clientProxyOrders();

  @Post('create')
  async create(@Body() payload: CreateIngredientDto) {
    return this.clientProxy.send(INGREDIENT_MSG.CREATE_INGREDIENT, payload);
  }
}
