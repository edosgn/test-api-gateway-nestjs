import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyAlegra } from '../rabbitmq/client-proxy';

import { ORDER_MSG, RECIPE_MSG } from '@core/domain/enums/kitchen-queue.enum';

import { CreateOrderDto } from '@kitchen/domain/dtos/create-order.dto';
import { CreateRecipeDto } from '@kitchen/domain/dtos/create-recipe.dto';

@ApiTags('kitchen')
@Controller('kitchen')
export class KitchenController {
  constructor(private readonly clientProxyAlegra: ClientProxyAlegra) {}

  private clientProxy = this.clientProxyAlegra.clientProxyOrders();

  @Post('order/create')
  async createOrder(@Body() payload: CreateOrderDto) {
    return this.clientProxy.send(ORDER_MSG.CREATE_ORDER, payload);
  }

  @Post('recipe/create')
  async createRecipe(@Body() payload: CreateRecipeDto) {
    return this.clientProxy.send(RECIPE_MSG.CREATE_RECIPE, payload);
  }
}
