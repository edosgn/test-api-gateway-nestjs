import { validate } from 'class-validator';
import { CreateIngredientDto } from '@warehouse/domain/dtos/create-ingredient.dto';

describe('CreateIngredientDto', () => {
  it('should be valid when name is provided and created_at is optional', async () => {
    // Arrange
    const dto = new CreateIngredientDto();
    dto.name = 'Tomato';
    dto.created_at = new Date();

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });

  it('should fail if name is missing', async () => {
    // Arrange
    const dto = new CreateIngredientDto();
    dto.created_at = new Date();

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail if name is not a string', async () => {
    // Arrange
    const dto = new CreateIngredientDto();
    // @ts-expect-error Invalid name format on purpose
    dto.name = 12345;
    dto.created_at = new Date();

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should be valid if created_at is omitted', async () => {
    // Arrange
    const dto = new CreateIngredientDto();
    dto.name = 'Onion';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });

  it('should fail if created_at is not a valid Date', async () => {
    // Arrange
    const dto = new CreateIngredientDto();
    dto.name = 'Garlic';
    // @ts-expect-error Invalid date format on purpose
    dto.created_at = 'invalid-date';

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('created_at');
  });
});
