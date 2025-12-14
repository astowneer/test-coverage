import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

type MockRepository<T = any> = {
  create: jest.Mock;
  save: jest.Mock;
  findOne: jest.Mock;
};

const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: MockRepository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<MockRepository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call addProduct and save a product', async () => {
    const dto = { title: 'Test Product', price: 100 };
    const productEntity = { ...dto } as Product;

    productRepository.create.mockReturnValue(productEntity);
    productRepository.save.mockResolvedValue(productEntity);

    const result = await service.addProduct(dto);

    expect(productRepository.create).toHaveBeenCalledWith(dto);
    expect(productRepository.save).toHaveBeenCalledWith(productEntity);
    expect(result).toEqual(productEntity);
  });

  it('should throw InternalServerErrorException when save fails', async () => {
    const dto = { title: 'Test Product', price: 100 };
    const productEntity = { ...dto } as Product;

    productRepository.create.mockReturnValue(productEntity);
    productRepository.save.mockRejectedValue(new Error('DB Error'));

    await expect(service.addProduct(dto)).rejects.toThrow(
      InternalServerErrorException,
    );

    expect(productRepository.create).toHaveBeenCalledWith(dto);
    expect(productRepository.save).toHaveBeenCalledWith(productEntity);
  });

  it('should return a product by id', async () => {
    const product = { id: 1, title: 'Test', price: 50 } as Product;
    productRepository.findOne.mockResolvedValue(product);

    const result = await service.getProductById(1);

    expect(productRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(product);
  });

  it('should throw NotFoundException if product not found', async () => {
    productRepository.findOne.mockResolvedValue(null);

    await expect(service.getProductById(1)).rejects.toThrow(NotFoundException);
    expect(productRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should call updateProduct and save updated product', async () => {
    const product = { id: 1, title: 'Old', price: 50 } as Product;
    const updateDto = { title: 'New', price: 100 };

    productRepository.findOne.mockResolvedValue(product);
    productRepository.save.mockResolvedValue({ ...product, ...updateDto });

    const result = await service.updateProduct(1, updateDto);

    expect(productRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(productRepository.save).toHaveBeenCalledWith({
      ...product,
      ...updateDto,
    });
    expect(result).toEqual({ ...product, ...updateDto });
  });

  it('should throw InternalServerErrorException if save fails', async () => {
    const product = { id: 1, title: 'Old', price: 50 } as Product;
    const updateDto = { title: 'New' };

    productRepository.findOne.mockResolvedValue(product);
    productRepository.save.mockRejectedValue(new Error('DB Error'));

    await expect(service.updateProduct(1, updateDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
