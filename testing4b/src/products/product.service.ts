import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error while adding product:', error);

      throw new InternalServerErrorException(
        'Не вдалося додати продукт до бази даних',
      );
    }
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Продукт з id=${id} не знайдено`);
    }

    return product;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getProductById(id);

    Object.assign(product, updateProductDto);

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error while updating product:', error);

      throw new InternalServerErrorException(
        'Не вдалося оновити інформацію про продукт',
      );
    }
  }
}
