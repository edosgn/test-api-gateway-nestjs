import { Body, Controller, Get, Post } from '@nestjs/common';

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

  @Get('order/findAll')
  async findAll() {
    return this.clientProxy.send(ORDER_MSG.FIND_ALL_ORDER, {});
  }

  @Post('recipe/create')
  async createRecipe(@Body() payload: CreateRecipeDto) {
    return this.clientProxy.send(RECIPE_MSG.CREATE_RECIPE, payload);
  }

  @Get('recipe/findAll')
  async findAllRecipe() {
    return this.clientProxy.send(RECIPE_MSG.FIND_ALL_RECIPE, {});
  }

  @Get('recipe/findOneRandom')
  async findOneRAndomRecipe() {
    return this.clientProxy.send(RECIPE_MSG.FIND_ONE_RANDOM_RECIPE, {});
  }
}
