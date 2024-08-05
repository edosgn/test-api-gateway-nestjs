import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyAlegra } from '../rabbitmq/client-proxy';

import {
  INGREDIENT_MSG,
  INVENTORY_MSG,
} from '@core/domain/enums/warehouse-queue.enum';

import { CreateIngredientDto } from '@warehouse/domain/dtos/create-ingredient.dto';
import { UpdateInventoryDto } from '@warehouse/domain/dtos/update-inventory.dto';

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly clientProxyAlegra: ClientProxyAlegra) {}

  private clientProxy = this.clientProxyAlegra.clientProxyOrders();

  @Post('order/create')
  async createOrder(@Body() payload: CreateIngredientDto) {
    return this.clientProxy.send(INGREDIENT_MSG.CREATE_INGREDIENT, payload);
  }

  @Post('inventory/update')
  async updateInventory(@Body() payload: UpdateInventoryDto) {
    return this.clientProxy.send(INVENTORY_MSG.UPDATE_INVENTORY, payload);
  }

  @Get('inventory/get')
  async getInventory() {
    return this.clientProxy.send(INVENTORY_MSG.GET_INVENTORY, {});
  }
}
