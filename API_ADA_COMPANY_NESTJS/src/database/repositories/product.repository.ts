import { Injectable } from '@nestjs/common';
import { ProductInterface } from 'src/products/product.interface';

@Injectable()
export class ProductRepository {
  private products: ProductInterface[] = [];
  create(product: ProductInterface): void {
    this.products.push(product);
  }
  update() {}
  getById(id: number): ProductInterface {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw Error('Produto não encontrado!');
    return product;
  }
  list(): ProductInterface[] {
    return this.products;
  }
  delete() {}
}
