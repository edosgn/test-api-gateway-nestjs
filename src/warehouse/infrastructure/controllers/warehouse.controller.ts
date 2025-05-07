import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyMyAPI } from '../rabbitmq/client-proxy';

import {
  INGREDIENT_MSG,
  INVENTORY_MSG,
} from '@core/domain/enums/warehouse-queue.enum';

import { CreateIngredientDto } from '@warehouse/domain/dtos/create-ingredient.dto';
import { UpdateInventoryDto } from '@warehouse/domain/dtos/update-inventory.dto';

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly clientProxyMyAPI: ClientProxyMyAPI) {}

  private clientProxy = this.clientProxyMyAPI.clientProxyWarehouse();

  @Post('ingredient/create')
  async createOrder(@Body() payload: CreateIngredientDto) {
    return this.clientProxy.send(INGREDIENT_MSG.CREATE_INGREDIENT, payload);
  }

  @Get('ingredient/findOneBy/:name')
  async getOneIngredientByName(@Param() name: string) {
    return this.clientProxy.send(
      INGREDIENT_MSG.GET_ONE_INGREDIENT_BY_NAME,
      name,
    );
  }

  @Post('inventory/update')
  async updateInventory(@Body() payload: UpdateInventoryDto) {
    return this.clientProxy.send(INVENTORY_MSG.UPDATE_INVENTORY, payload);
  }

  @Get('inventory/findAll')
  async getInventory() {
    return this.clientProxy.send(INVENTORY_MSG.GET_INVENTORY, {});
  }

  @Get('inventory/findOneBy/:ingredient_id')
  async getOneInventoryByIngredientId(@Param() ingredient_id: number) {
    return this.clientProxy.send(
      INVENTORY_MSG.GET_ONE_INVENTORY_BY_INGREDIENT_ID,
      ingredient_id,
    );
  }
}
