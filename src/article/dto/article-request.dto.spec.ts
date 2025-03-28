import { validate } from 'class-validator';
import { ArticleRequestDto } from './article-request.dto';

describe('ArticleRequestDto', () => {
  let dto: ArticleRequestDto;

  beforeEach(() => {
    dto = new ArticleRequestDto();
    dto.name = 'Laptop Gamer';
    dto.description = 'Laptop con procesador i7 y 16GB RAM';
    dto.price = 1500.99;
    dto.stock = 10;
    dto.isActive = true;
  });

  it('should validate a valid DTO', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if name is empty', async () => {
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail if description is empty', async () => {
    dto.description = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
  });

  it('should fail if price is not positive', async () => {
    dto.price = -100;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('price');
  });

  it('should fail if stock is negative', async () => {
    dto.stock = -5;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('stock');
  });

  it('should fail if isActive is not a boolean', async () => {
    // @ts-ignore
    dto.isActive = 'true';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('isActive');
  });
});