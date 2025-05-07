import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseController } from '@warehouse/infrastructure/controllers/warehouse.controller';
import { ClientProxyMyAPI } from '@warehouse/infrastructure/rabbitmq/client-proxy';
import { CreateIngredientDto } from '@warehouse/domain/dtos/create-ingredient.dto';
import { UpdateInventoryDto } from '@warehouse/domain/dtos/update-inventory.dto';
import {
  INGREDIENT_MSG,
  INVENTORY_MSG,
} from '@core/domain/enums/warehouse-queue.enum';

describe('WarehouseController', () => {
  let controller: WarehouseController;
  let mockClientProxy: { send: jest.Mock };
  let mockClientProxyMyAPI: { clientProxyWarehouse: jest.Mock };

  beforeEach(async () => {
    // Arrange
    mockClientProxy = {
      send: jest.fn(),
    };

    mockClientProxyMyAPI = {
      clientProxyWarehouse: jest.fn().mockReturnValue(mockClientProxy),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseController],
      providers: [
        {
          provide: ClientProxyMyAPI,
          useValue: mockClientProxyMyAPI,
        },
      ],
    }).compile();

    controller = module.get<WarehouseController>(WarehouseController);
  });

  it('should call createOrder with correct data', async () => {
    // Arrange
    const dto: CreateIngredientDto = { name: 'Tomato', created_at: new Date() };
    mockClientProxy.send.mockReturnValue('created');

    // Act
    const result = await controller.createOrder(dto);

    // Assert
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      INGREDIENT_MSG.CREATE_INGREDIENT,
      dto,
    );
    expect(result).toBe('created');
  });

  it('should call getOneIngredientByName', async () => {
    // Arrange
    const name = 'Onion';
    mockClientProxy.send.mockReturnValue('ingredient');

    // Act
    const result = await controller.getOneIngredientByName(name);

    // Assert
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      INGREDIENT_MSG.GET_ONE_INGREDIENT_BY_NAME,
      name,
    );
    expect(result).toBe('ingredient');
  });

  it('should call updateInventory', async () => {
    // Arrange
    const dto: UpdateInventoryDto = { id: 1, ingredient_id: 10, quantity: 50 };
    mockClientProxy.send.mockReturnValue('updated');

    // Act
    const result = await controller.updateInventory(dto);

    // Assert
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      INVENTORY_MSG.UPDATE_INVENTORY,
      dto,
    );
    expect(result).toBe('updated');
  });

  it('should call getInventory', async () => {
    // Arrange
    mockClientProxy.send.mockReturnValue(['inventory']);

    // Act
    const result = await controller.getInventory();

    // Assert
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      INVENTORY_MSG.GET_INVENTORY,
      {},
    );
    expect(result).toEqual(['inventory']);
  });

  it('should call getOneInventoryByIngredientId', async () => {
    // Arrange
    const ingredientId = 42;
    mockClientProxy.send.mockReturnValue('inventory-item');

    // Act
    const result = await controller.getOneInventoryByIngredientId(ingredientId);

    // Assert
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      INVENTORY_MSG.GET_ONE_INVENTORY_BY_INGREDIENT_ID,
      ingredientId,
    );
    expect(result).toBe('inventory-item');
  });
});
