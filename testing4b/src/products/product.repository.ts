import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createAndSave(productData: Partial<Product>): Promise<Product> {
    const product = this.create(productData);
    return this.save(product);
  }

  async findById(id: number): Promise<Product | null> {
    return this.findOne({ where: { id } });
  }
}
