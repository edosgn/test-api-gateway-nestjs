import { validate } from 'class-validator';
import { UpdateInventoryDto } from '@warehouse/domain/dtos/update-inventory.dto';

describe('UpdateInventoryDto', () => {
  it('should be valid when all properties are valid numbers', async () => {
    // Arrange
    const dto = new UpdateInventoryDto();
    dto.id = 1;
    dto.ingredient_id = 2;
    dto.quantity = 10;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });

  it('should fail if id is missing', async () => {
    // Arrange
    const dto = new UpdateInventoryDto();
    dto.ingredient_id = 2;
    dto.quantity = 10;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.some((e) => e.property === 'id')).toBe(true);
  });

  it('should fail if ingredient_id is not a number', async () => {
    // Arrange
    const dto = new UpdateInventoryDto();
    dto.id = 1;
    // @ts-expect-error invalid type
    dto.ingredient_id = 'two';
    dto.quantity = 10;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.some((e) => e.property === 'ingredient_id')).toBe(true);
  });

  it('should fail if quantity is missing', async () => {
    // Arrange
    const dto = new UpdateInventoryDto();
    dto.id = 1;
    dto.ingredient_id = 2;

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.some((e) => e.property === 'quantity')).toBe(true);
  });

  it('should fail if quantity is not a number', async () => {
    // Arrange
    const dto = new UpdateInventoryDto();
    dto.id = 1;
    dto.ingredient_id = 2;
    // @ts-expect-error invalid type
    dto.quantity = 'ten';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.some((e) => e.property === 'quantity')).toBe(true);
  });
});
