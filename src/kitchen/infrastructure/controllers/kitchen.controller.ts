import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { ClientProxyMyAPI } from '../rabbitmq/client-proxy';

import { ORDER_MSG, RECIPE_MSG } from '@core/domain/enums/kitchen-queue.enum';

import { CreateOrderDto } from '@kitchen/domain/dtos/create-order.dto';
import { CreateRecipeDto } from '@kitchen/domain/dtos/create-recipe.dto';
import { PreparationOrderDto } from '@kitchen/domain/dtos/peparation-order.dto';

@ApiTags('kitchen')
@Controller('kitchen')
export class KitchenController {
  constructor(private readonly clientProxyMyAPI: ClientProxyMyAPI) {}

  private clientProxy = this.clientProxyMyAPI.clientProxyKitchen();

  @Post('order/create')
  async createOrder(@Body() payload: CreateOrderDto) {
    return this.clientProxy.send(ORDER_MSG.CREATE_ORDER, payload);
  }

  @Post('order/preparation')
  async preparationOrder(@Body() payload: PreparationOrderDto) {
    return this.clientProxy.send(ORDER_MSG.PREPARATION_ORDER, payload);
  }

  @Get('order/findAll')
  async findAll() {
    return this.clientProxy.send(ORDER_MSG.FIND_ALL_ORDER, {});
  }

  @Post('recipe/create')
  async createRecipe(@Body() payload: CreateRecipeDto) {
    return this.clientProxy.send(RECIPE_MSG.CREATE_RECIPE, payload);
  }

  @Get('recipe/findOneBy/:id')
  async findOneRecipeById(@Param() id: string) {
    return this.clientProxy.send(RECIPE_MSG.FIND_ONE_RECIPE_BY_ID, id);
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
